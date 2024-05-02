-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '15';

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
