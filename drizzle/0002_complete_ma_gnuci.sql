DROP INDEX "idx_kisses_id";--> statement-breakpoint
ALTER TABLE `kisses` ALTER COLUMN "recipient" TO "recipient" text NOT NULL;--> statement-breakpoint
CREATE INDEX `idx_kisses_id` ON `kisses` (`id`);