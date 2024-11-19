-- DropForeignKey
ALTER TABLE `cell` DROP FOREIGN KEY `Cell_gridId_fkey`;

-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_userId_fkey`;

-- DropForeignKey
ALTER TABLE `grid` DROP FOREIGN KEY `Grid_gameId_fkey`;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grid` ADD CONSTRAINT `Grid_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cell` ADD CONSTRAINT `Cell_gridId_fkey` FOREIGN KEY (`gridId`) REFERENCES `Grid`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
