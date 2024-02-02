-- CreateEnum
CREATE TYPE "DataProvider" AS ENUM ('GOOGLE', 'FACEBOOK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmationCode" TEXT NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chromePodId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTraits" (
    "id" TEXT NOT NULL,
    "bigFiveId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTraits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BigFive" (
    "id" TEXT NOT NULL,
    "openness" DOUBLE PRECISION NOT NULL,
    "conscientiousness" DOUBLE PRECISION NOT NULL,
    "extraversion" DOUBLE PRECISION NOT NULL,
    "agreeableness" DOUBLE PRECISION NOT NULL,
    "neuroticism" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BigFive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChromePod" (
    "id" TEXT NOT NULL,
    "chromePodId" TEXT NOT NULL,
    "rdpUsername" TEXT NOT NULL,
    "rdpPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChromePod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakeoutFile" (
    "id" TEXT NOT NULL,
    "dataProvider" "DataProvider" NOT NULL,
    "filename" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TakeoutFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTraits_bigFiveId_key" ON "UserTraits"("bigFiveId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTraits_userId_key" ON "UserTraits"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChromePod_chromePodId_key" ON "ChromePod"("chromePodId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_chromePodId_fkey" FOREIGN KEY ("chromePodId") REFERENCES "ChromePod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTraits" ADD CONSTRAINT "UserTraits_bigFiveId_fkey" FOREIGN KEY ("bigFiveId") REFERENCES "BigFive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTraits" ADD CONSTRAINT "UserTraits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeoutFile" ADD CONSTRAINT "TakeoutFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
