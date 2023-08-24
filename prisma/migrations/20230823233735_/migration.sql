-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "foto" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
