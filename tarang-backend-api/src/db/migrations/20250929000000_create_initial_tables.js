exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .raw('CREATE EXTENSION IF NOT EXISTS "postgis"')
    .createTable('users', table => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('firebase_uid').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('role').notNullable().defaultTo('citizen');
      table.string('name');
      table.string('language').defaultTo('en');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('last_login').defaultTo(knex.fn.now());
    })
    .createTable('reports', table => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('hazard_type').notNullable();
      table.text('description');
      table.specificType('location', 'geometry(point, 4326)').notNullable();
      table.specificType('media_urls', 'text[]');
      table.string('status').notNullable().defaultTo('queued_for_review');
      table.string('language', 2).defaultTo('en');
      table.uuid('verified_by').references('id').inTable('users').onDelete('SET NULL');
      table.text('notes');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reports')
    .dropTableIfExists('users');
};