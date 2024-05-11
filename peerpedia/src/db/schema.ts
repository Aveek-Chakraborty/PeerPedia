import { serial, text, pgTable } from "drizzle-orm/pg-core";

export const mySchemaUsers = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
});