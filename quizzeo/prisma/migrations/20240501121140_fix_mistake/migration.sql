/*
  Warnings:

  - You are about to drop the column `status` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "status",
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "QuizStatus";
