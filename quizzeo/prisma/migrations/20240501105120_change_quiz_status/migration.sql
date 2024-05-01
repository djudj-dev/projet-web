/*
  Warnings:

  - The values [AccountValidator] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `enabled` on the `Quiz` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuizStatus" AS ENUM ('Draft', 'Enabled', 'Finish');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('GlobalAdmin', 'QuizAdmin', 'QuizCreator', 'User', 'UserAdmin');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "enabled",
ADD COLUMN     "status" "QuizStatus" NOT NULL DEFAULT 'Draft';
