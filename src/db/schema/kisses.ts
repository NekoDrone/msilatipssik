import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

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
        recipient: text("recipient").notNull(),
    },
    (table) => {
        return [index("idx_kisses_id").on(table.id)];
    },
);

export const kissesSelectSchema = createSelectSchema(kissesSchema, {
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});
export const kissesInsertSchema = createInsertSchema(kissesSchema);

export const kissesSelectArraySchema = z.array(kissesSelectSchema);

export type Kisses = z.infer<typeof kissesSelectSchema>;
