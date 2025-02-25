/*
  Warnings:

  - Added the required column `owner` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "owner" TEXT NOT NULL,
ALTER COLUMN "orgId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
