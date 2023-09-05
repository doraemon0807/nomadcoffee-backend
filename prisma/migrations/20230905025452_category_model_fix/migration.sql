/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
