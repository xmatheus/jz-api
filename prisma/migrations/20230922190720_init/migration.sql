-- CreateEnum
CREATE TYPE "PokemonType" AS ENUM ('charizard', 'mewtwo', 'pikachu');

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "tipo" "PokemonType" NOT NULL,
    "treinador" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
