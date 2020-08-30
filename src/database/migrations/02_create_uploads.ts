import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('uploads', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.string('url').notNullable();
    table.bigInteger('size').notNullable();
    table
      .timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('uploads');
}
