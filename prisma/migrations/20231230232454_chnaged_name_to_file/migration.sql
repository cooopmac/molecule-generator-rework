/*
  Warnings:

  - You are about to drop the column `data` on the `molecule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `molecule` DROP COLUMN `data`,
    ADD COLUMN `file` VARCHAR(1024) NULL;
