-- CreateTable
CREATE TABLE "world_organizations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "world_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "world_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "world_organizations_slug_key" ON "world_organizations"("slug");

-- AddForeignKey
ALTER TABLE "world_organizations" ADD CONSTRAINT "world_organizations_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "worlds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
