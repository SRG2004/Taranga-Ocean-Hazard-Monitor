const request = require('supertest');
const app = require('../../src/app');

// Mock the auth middleware
jest.mock('../../src/middleware/authMiddleware', () => (req, res, next) => {
    req.user = { uid: 'test-user-123' };
    next();
});

// Mock the DB module
jest.mock('../../src/db', () => {
    const mockKnex = () => {
        return {
            insert: jest.fn().mockReturnThis(),
            returning: jest.fn().mockResolvedValue([{ id: 'mock-report-id', status: 'queued_for_review' }]),
            where: jest.fn().mockReturnThis(),
            update: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
        };
    };
    mockKnex.raw = jest.fn(() => 'MOCKED_RAW_GEOMETRY');
    return mockKnex;
});

// Mock Firebase
jest.mock('../../src/config/firebase', () => ({
    admin: {
        database: () => ({
            ref: () => ({
                push: () => ({
                    set: jest.fn().mockResolvedValue(null)
                }),
                set: jest.fn().mockResolvedValue(null)
            })
        })
    }
}));

describe('Reports API', () => {
    
    describe('POST /reports', () => {
        it('should create a new report and return 201', async () => {
            const response = await request(app)
                .post('/reports')
                .send({
                    hazardType: 'high_wave',
                    description: 'Test description',
                    location: { lat: 16.95, lng: 73.45 },
                    timestamp: new Date().toISOString()
                })
                .expect(201);

            expect(response.body).toHaveProperty('reportId');
            expect(response.body).toHaveProperty('status', 'queued_for_review');
        });

        it('should return 400 for missing required fields', async () => {
            await request(app)
                .post('/reports')
                .send({ description: 'only a description' })
                .expect(400);
        });
    });

});