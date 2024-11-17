/*
  Warnings:

  - You are about to alter the column `status` on the `game` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `difficulty` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `game` ADD COLUMN `difficulty` ENUM('EASY', 'MEDIUM', 'HARD', 'CUSTOM') NOT NULL,
    MODIFY `status` ENUM('IN_PROGRESS', 'WON', 'LOST', 'CANCELLED') NOT NULL DEFAULT 'IN_PROGRESS';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_slug_key` ON `User`(`slug`);
