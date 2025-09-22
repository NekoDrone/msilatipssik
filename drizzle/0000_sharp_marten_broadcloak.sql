CREATE TABLE `kisses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reason` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch('now')) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_kisses_id` ON `kisses` (`id`);