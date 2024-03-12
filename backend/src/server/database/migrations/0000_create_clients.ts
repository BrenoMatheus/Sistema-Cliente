import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.client, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name", 70).checkLength("<=", 70).index().notNullable();
      table.string("email").unique().notNullable();
      table.float("telephone", 50).notNullable();
      table.string("longitude", 100).checkLength("<=", 100).index().notNullable();
      table.string("latitude", 100).checkLength("<=", 100).index().notNullable();

      table.comment("Table used to store system Clients");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.client}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.client).then(() => {
    console.log(`# Dropped table ${ETableNames.client}`);
  });
}
