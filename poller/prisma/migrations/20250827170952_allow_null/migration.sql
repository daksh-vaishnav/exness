-- CreateTable
CREATE TABLE "public"."trades" (
    "e" TEXT,
    "E" TIMESTAMP(3),
    "s" TEXT NOT NULL,
    "a" TEXT,
    "p" DECIMAL(38,18),
    "q" DECIMAL(38,18),
    "f" BIGINT,
    "l" BIGINT,
    "T" TIMESTAMP(3) NOT NULL,
    "m" BOOLEAN,
    "M" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("s","T")
);
