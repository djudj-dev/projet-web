/*
  Warnings:

  - You are about to drop the column `Title` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `answers` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `goodAnswer` on the `Result` table. All the data in the column will be lost.
  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "Title",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "answers",
DROP COLUMN "goodAnswer",
ADD COLUMN     "score" INTEGER NOT NULL;
