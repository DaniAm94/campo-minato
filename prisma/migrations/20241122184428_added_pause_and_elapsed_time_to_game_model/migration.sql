-- AlterTable
ALTER TABLE `game` ADD COLUMN `elapsedTime` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pauseTime` DATETIME(3) NULL;
