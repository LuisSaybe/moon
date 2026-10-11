CREATE TABLE "GameObjectDefinition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    CONSTRAINT "GameObjectDefinition_pkey" PRIMARY KEY ("id")
);
