-- CreateEnum
CREATE TYPE "DataProvider" AS ENUM ('GOOGLE', 'FACEBOOK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmationCode" TEXT NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "userTraitsId" TEXT NOT NULL,
    "chromePodId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sessionSecret" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChromePod" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chromePodK8sId" TEXT NOT NULL,
    "rdpUsername" TEXT NOT NULL,
    "rdpPassword" TEXT NOT NULL,

    CONSTRAINT "ChromePod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakeoutFile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dataProvider" "DataProvider" NOT NULL,
    "filename" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "TakeoutFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTraits" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UserTraits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Riasec" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "realistic" DOUBLE PRECISION NOT NULL,
    "investigative" DOUBLE PRECISION NOT NULL,
    "artistic" DOUBLE PRECISION NOT NULL,
    "social" DOUBLE PRECISION NOT NULL,
    "enterprising" DOUBLE PRECISION NOT NULL,
    "conventional" DOUBLE PRECISION NOT NULL,
    "summary" TEXT,
    "userTraitsId" TEXT,

    CONSTRAINT "Riasec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoralFoundations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "careHarm" DOUBLE PRECISION NOT NULL,
    "fairnessCheating" DOUBLE PRECISION NOT NULL,
    "loyaltyBetrayal" DOUBLE PRECISION NOT NULL,
    "authoritySubversion" DOUBLE PRECISION NOT NULL,
    "sanctityDegradation" DOUBLE PRECISION NOT NULL,
    "summary" TEXT,
    "userTraitsId" TEXT,

    CONSTRAINT "MoralFoundations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolitcalCompass" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "economic" DOUBLE PRECISION NOT NULL,
    "social" DOUBLE PRECISION NOT NULL,
    "summary" TEXT,
    "userTraitsId" TEXT,

    CONSTRAINT "PolitcalCompass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BigFive" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "openness" DOUBLE PRECISION NOT NULL,
    "conscientiousness" DOUBLE PRECISION NOT NULL,
    "extraversion" DOUBLE PRECISION NOT NULL,
    "agreeableness" DOUBLE PRECISION NOT NULL,
    "neuroticism" DOUBLE PRECISION NOT NULL,
    "summary" TEXT,
    "userTraitsId" TEXT,

    CONSTRAINT "BigFive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mbti" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "extraversion" BOOLEAN NOT NULL,
    "sensing" BOOLEAN NOT NULL,
    "thinking" BOOLEAN NOT NULL,
    "judging" BOOLEAN NOT NULL,
    "summary" TEXT,
    "userTraitsId" TEXT,

    CONSTRAINT "Mbti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SixteenPersonalityFactor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "warmth" DOUBLE PRECISION NOT NULL,
    "reasoning" DOUBLE PRECISION NOT NULL,
    "emotionalStability" DOUBLE PRECISION NOT NULL,
    "dominance" DOUBLE PRECISION NOT NULL,
    "liveliness" DOUBLE PRECISION NOT NULL,
    "ruleConsciousness" DOUBLE PRECISION NOT NULL,
    "socialBoldness" DOUBLE PRECISION NOT NULL,
    "sensitivity" DOUBLE PRECISION NOT NULL,
    "vigilance" DOUBLE PRECISION NOT NULL,
    "abstractedness" DOUBLE PRECISION NOT NULL,
    "privateness" DOUBLE PRECISION NOT NULL,
    "apprehension" DOUBLE PRECISION NOT NULL,
    "opennessToChange" DOUBLE PRECISION NOT NULL,
    "selfReliance" DOUBLE PRECISION NOT NULL,
    "perfectionism" DOUBLE PRECISION NOT NULL,
    "tension" DOUBLE PRECISION NOT NULL,
    "summary" TEXT,
    "userTraitsId" TEXT,

    CONSTRAINT "SixteenPersonalityFactor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userTraitsId_key" ON "User"("userTraitsId");

-- CreateIndex
CREATE UNIQUE INDEX "User_chromePodId_key" ON "User"("chromePodId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChromePod_chromePodK8sId_key" ON "ChromePod"("chromePodK8sId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTraits_userId_key" ON "UserTraits"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTraitsId_fkey" FOREIGN KEY ("userTraitsId") REFERENCES "UserTraits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_chromePodId_fkey" FOREIGN KEY ("chromePodId") REFERENCES "ChromePod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeoutFile" ADD CONSTRAINT "TakeoutFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Riasec" ADD CONSTRAINT "Riasec_userTraitsId_fkey" FOREIGN KEY ("userTraitsId") REFERENCES "UserTraits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoralFoundations" ADD CONSTRAINT "MoralFoundations_userTraitsId_fkey" FOREIGN KEY ("userTraitsId") REFERENCES "UserTraits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolitcalCompass" ADD CONSTRAINT "PolitcalCompass_userTraitsId_fkey" FOREIGN KEY ("userTraitsId") REFERENCES "UserTraits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BigFive" ADD CONSTRAINT "BigFive_userTraitsId_fkey" FOREIGN KEY ("userTraitsId") REFERENCES "UserTraits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mbti" ADD CONSTRAINT "Mbti_userTraitsId_fkey" FOREIGN KEY ("userTraitsId") REFERENCES "UserTraits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SixteenPersonalityFactor" ADD CONSTRAINT "SixteenPersonalityFactor_userTraitsId_fkey" FOREIGN KEY ("userTraitsId") REFERENCES "UserTraits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
