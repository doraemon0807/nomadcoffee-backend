/*
  Warnings:

  - You are about to drop the column `categoryId` on the `CoffeeShop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShop" DROP CONSTRAINT "CoffeeShop_categoryId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "_CategoryToCoffeeShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoffeeShop_AB_unique" ON "_CategoryToCoffeeShop"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCoffeeShop_B_index" ON "_CategoryToCoffeeShop"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD CONSTRAINT "_CategoryToCoffeeShop_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD CONSTRAINT "_CategoryToCoffeeShop_B_fkey" FOREIGN KEY ("B") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
