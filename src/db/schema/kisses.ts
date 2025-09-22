import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const kissesSchema = sqliteTable(
    "kisses",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        reason: text("reason").notNull(),
        createdAt: integer("created_at", { mode: "timestamp" })
            .notNull()
            .default(sql`(unixepoch('now'))`),
        updatedAt: integer("updated_at", { mode: "timestamp" })
            .notNull()
            .default(sql`(unixepoch('now'))`),
    },
    (table) => {
        return [index("idx_kisses_id").on(table.id)];
    },
);

export const kissesSelectSchema = createSelectSchema(kissesSchema);
export const kissesInsertSchema = createInsertSchema(kissesSchema);

export type KissesInsert = z.infer<typeof kissesInsertSchema>;
