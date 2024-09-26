-- CreateTable
CREATE TABLE "adonis_schema" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "batch" INTEGER NOT NULL,
    "migration_time" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adonis_schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adonis_schema_versions" (
    "version" INTEGER NOT NULL,

    CONSTRAINT "adonis_schema_versions_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "auth_access_tokens" (
    "id" SERIAL NOT NULL,
    "tokenable_id" INTEGER NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "hash" VARCHAR(255) NOT NULL,
    "abilities" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "last_used_at" TIMESTAMPTZ(6),
    "expires_at" TIMESTAMPTZ(6),

    CONSTRAINT "auth_access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "content" JSON NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "slug" VARCHAR(255) NOT NULL,
    "public_id" VARCHAR(255) NOT NULL DEFAULT '10b7ee0f-5a4c-4514-a9d8-941a03865928',
    "theme" VARCHAR(255) NOT NULL DEFAULT 'default',

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "n5e_characters" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "classes" JSONB NOT NULL DEFAULT '[]',
    "class_mod" JSONB,
    "clan" VARCHAR(255) NOT NULL DEFAULT '',
    "background" VARCHAR(255) NOT NULL DEFAULT '',
    "alignment" VARCHAR(255) NOT NULL DEFAULT '',
    "level" INTEGER NOT NULL DEFAULT 1,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "ryo" INTEGER NOT NULL DEFAULT 0,
    "feats" JSONB NOT NULL DEFAULT '[]',
    "jutsus" JSONB NOT NULL DEFAULT '[]',
    "abilities" JSONB NOT NULL DEFAULT '{"Wisdom": {"value": 10, "customBonus": 0}, "Charisma": {"value": 10, "customBonus": 0}, "Strength": {"value": 10, "customBonus": 0}, "Dexterity": {"value": 10, "customBonus": 0}, "Constitution": {"value": 10, "customBonus": 0}, "Intelligence": {"value": 10, "customBonus": 0}}',
    "skills" JSONB NOT NULL DEFAULT '[]',
    "saving_throws" JSONB NOT NULL DEFAULT '{"Wisdom": {"customBonus": 0, "isProficient": false}, "Charisma": {"customBonus": 0, "isProficient": false}, "Strength": {"customBonus": 0, "isProficient": false}, "Dexterity": {"customBonus": 0, "isProficient": false}, "Constitution": {"customBonus": 0, "isProficient": false}, "Intelligence": {"customBonus": 0, "isProficient": false}}',
    "elemental_affinities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "info" JSONB NOT NULL DEFAULT '{"age": "", "eyes": "", "hair": "", "rank": "Genin", "size": "", "skin": "", "avatar": "", "gender": "", "height": "", "isAnbu": false, "titles": [], "weight": "", "village": "", "isNukenin": false, "background": ""}',
    "resistances" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "immunities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "custom_data" JSONB NOT NULL DEFAULT '{}',
    "custom_tabs" JSON NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "public_id" VARCHAR(255) NOT NULL DEFAULT '22cb90e5-e9bb-4f7c-86d4-5b64ed9bb93d',
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "current_hp" INTEGER NOT NULL DEFAULT 0,
    "temporary_hp" INTEGER NOT NULL DEFAULT 0,
    "current_cp" INTEGER NOT NULL DEFAULT 0,
    "temporary_cp" INTEGER NOT NULL DEFAULT 0,
    "movement_speed" INTEGER NOT NULL DEFAULT 30,
    "jutsu_casting" JSONB NOT NULL DEFAULT '{"genjutsu": {"ability": "Charisma", "customDCBonus": 0, "customAttackBonus": 0}, "ninjutsu": {"ability": "Intelligence", "customDCBonus": 0, "customAttackBonus": 0}, "taijutsu": {"ability": "Strength", "customDCBonus": 0, "customAttackBonus": 0}, "bukijutsu": {"ability": "Dexterity", "customDCBonus": 0, "customAttackBonus": 0}}',
    "armor_class" JSONB NOT NULL DEFAULT '{"ability": "Dexterity", "armorBonus": 0, "customBonus": 0, "shieldBonus": 0}',
    "proficiencies" JSONB NOT NULL DEFAULT '{"kits": [], "armor": [], "tools": [], "weapons": []}',
    "bulk" JSONB NOT NULL DEFAULT '{"customBonus": 0, "customMultiplier": 1}',

    CONSTRAINT "n5e_characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255),
    "email" VARCHAR(254) NOT NULL,
    "username" VARCHAR(254) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worlds" (
    "id" SERIAL NOT NULL,
    "public_id" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "worlds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_public_id_unique" ON "books"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "n5e_characters_public_id_unique" ON "n5e_characters"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "worlds_public_id_unique" ON "worlds"("public_id");

-- AddForeignKey
ALTER TABLE "auth_access_tokens" ADD CONSTRAINT "auth_access_tokens_tokenable_id_foreign" FOREIGN KEY ("tokenable_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "n5e_characters" ADD CONSTRAINT "n5e_characters_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "worlds" ADD CONSTRAINT "worlds_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

