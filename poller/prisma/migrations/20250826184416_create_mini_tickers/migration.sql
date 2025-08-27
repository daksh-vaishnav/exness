-- CreateTable
CREATE TABLE "public"."mini_tickers" (
    "E" TIMESTAMP(3) NOT NULL,
    "s" TEXT NOT NULL,
    "c" DECIMAL(38,18) NOT NULL,
    "o" DECIMAL(38,18) NOT NULL,
    "h" DECIMAL(38,18) NOT NULL,
    "l" DECIMAL(38,18) NOT NULL,
    "v" DECIMAL(38,18) NOT NULL,
    "q" DECIMAL(38,18) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mini_tickers_pkey" PRIMARY KEY ("s","E")
);
