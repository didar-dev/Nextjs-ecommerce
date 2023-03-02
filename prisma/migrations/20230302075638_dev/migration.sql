-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Name" TEXT,
    "Password" TEXT NOT NULL,
    "GoogleId" TEXT,
    "FacebookId" TEXT,
    "GithubId" TEXT,
    "Role" TEXT NOT NULL DEFAULT 'user',
    "Verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Subtitle" TEXT NOT NULL,
    "Title_ku" TEXT,
    "Subtitle_ku" TEXT,
    "Title_ar" TEXT,
    "Subtitle_ar" TEXT,
    "Image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Price" INTEGER NOT NULL,
    "Discount" INTEGER NOT NULL,
    "Thumbnail" TEXT NOT NULL,
    "Images" TEXT[],
    "Stock" INTEGER NOT NULL,
    "Name_ku" TEXT,
    "Description_ku" TEXT,
    "Name_ar" TEXT,
    "Description_ar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER,
    "brandId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Name_ku" TEXT,
    "Name_ar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Name_ku" TEXT,
    "Name_ar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Widget" (
    "id" SERIAL NOT NULL,
    "Slot" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Title_Color" TEXT,
    "Subtitle" TEXT NOT NULL,
    "Subtitle_Color" TEXT,
    "Title_ku" TEXT,
    "Subtitle_ku" TEXT,
    "Title_ar" TEXT,
    "Subtitle_ar" TEXT,
    "Image" TEXT NOT NULL,
    "ImageAlt" TEXT NOT NULL,
    "ImageLink" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Background" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Widget_Slot_key" ON "Widget"("Slot");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
