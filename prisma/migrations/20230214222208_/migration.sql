/*
  Warnings:

  - You are about to drop the column `content` on the `Slide` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Slide` table. All the data in the column will be lost.
  - Added the required column `Image` to the `Slide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Subtitle` to the `Slide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Slide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slide" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "Image" TEXT NOT NULL,
ADD COLUMN     "Subtitle" TEXT NOT NULL,
ADD COLUMN     "Subtitle_ar" TEXT,
ADD COLUMN     "Subtitle_ku" TEXT,
ADD COLUMN     "Title" TEXT NOT NULL,
ADD COLUMN     "Title_ar" TEXT,
ADD COLUMN     "Title_ku" TEXT;
