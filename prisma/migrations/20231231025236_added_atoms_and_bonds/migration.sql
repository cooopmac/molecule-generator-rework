/*
  Warnings:

  - You are about to drop the column `file` on the `molecule` table. All the data in the column will be lost.
  - Added the required column `atomCount` to the `Molecule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bondCount` to the `Molecule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `science` to the `Molecule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `molecule` DROP COLUMN `file`,
    ADD COLUMN `atomCount` INTEGER NOT NULL,
    ADD COLUMN `bondCount` INTEGER NOT NULL,
    ADD COLUMN `science` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Atom` (
    `id` INTEGER NOT NULL,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `z` DOUBLE NOT NULL,
    `element` VARCHAR(191) NOT NULL,
    `moleculeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bond` (
    `id` INTEGER NOT NULL,
    `a1` INTEGER NOT NULL,
    `a2` INTEGER NOT NULL,
    `moleculeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Atom` ADD CONSTRAINT `Atom_moleculeId_fkey` FOREIGN KEY (`moleculeId`) REFERENCES `Molecule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bond` ADD CONSTRAINT `Bond_moleculeId_fkey` FOREIGN KEY (`moleculeId`) REFERENCES `Molecule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
