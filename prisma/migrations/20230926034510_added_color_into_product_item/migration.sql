/*
  Warnings:

  - Added the required column `color` to the `ProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductItem" ADD COLUMN     "color" TEXT NOT NULL;
