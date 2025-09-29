
const request = require('supertest');
const app = require('../../src/app');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

describe('Circles API', () => {
    let token;
    let userId;

    beforeAll(done => {
        db.serialize(() => {
            db.run(`
                CREATE TABLE users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                );
            `);
            db.run(`
                CREATE TABLE circles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT
                );
            `);
            db.run(`
                CREATE TABLE circle_members (
                    circle_id INTEGER,
                    user_id INTEGER,
                    FOREIGN KEY (circle_id) REFERENCES circles(id),
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    PRIMARY KEY (circle_id, user_id)
                );
            `, done);
        });
    });

    afterAll(done => {
        db.close(done);
    });

    it('should have at least one test', () => {
        // TODO: Add tests for circle creation, membership, etc.
        expect(true).toBe(true);
    });
});
