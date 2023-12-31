/*
  Warnings:

  - You are about to alter the column `data` on the `molecule` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `molecule` MODIFY `data` VARCHAR(191) NULL;
