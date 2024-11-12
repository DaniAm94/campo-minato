/*
  Warnings:

  - The values [Vinta] on the enum `Game_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `game` MODIFY `status` ENUM('IN_CORSO', 'VINTA', 'PERSA', 'ANNULLATA') NOT NULL DEFAULT 'IN_CORSO';
