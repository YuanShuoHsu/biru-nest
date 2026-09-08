ALTER TABLE "organization" ADD COLUMN "currency" text DEFAULT 'TWD' NOT NULL;--> statement-breakpoint
DO $$
DECLARE "conflicting" text;
BEGIN
  SELECT string_agg("organization_id", ', ') INTO "conflicting"
  FROM (
    SELECT "organization_id"
    FROM (
      SELECT m."organization_id", f."price_currency"
      FROM "offer" f
      JOIN "menu_item" mi ON mi."id" = f."menu_item_id"
      JOIN "menu" m ON m."id" = mi."menu_id"
      WHERE f."price_currency" IS NOT NULL
      UNION
      SELECT "organization_id", "price_currency"
      FROM "ingredient"
      WHERE "price_currency" IS NOT NULL
    ) pairs
    GROUP BY "organization_id"
    HAVING count(*) > 1
  ) mixed;

  IF "conflicting" IS NOT NULL THEN
    RAISE EXCEPTION
      'these organizations have more than one price_currency, pick one each before migrating: %',
      "conflicting";
  END IF;
END $$;--> statement-breakpoint
UPDATE "organization" o SET "currency" = c."currency"
FROM (
  SELECT m."organization_id", MODE() WITHIN GROUP (ORDER BY f."price_currency") AS "currency"
  FROM "offer" f
  JOIN "menu_item" mi ON mi."id" = f."menu_item_id"
  JOIN "menu" m ON m."id" = mi."menu_id"
  WHERE f."price_currency" IS NOT NULL
  GROUP BY m."organization_id"
) c
WHERE o."id" = c."organization_id";--> statement-breakpoint
UPDATE "organization" o SET "currency" = c."currency"
FROM (
  SELECT "organization_id", MODE() WITHIN GROUP (ORDER BY "price_currency") AS "currency"
  FROM "ingredient"
  WHERE "price_currency" IS NOT NULL
  GROUP BY "organization_id"
) c
WHERE o."id" = c."organization_id"
  AND NOT EXISTS (
    SELECT 1
    FROM "offer" f
    JOIN "menu_item" mi ON mi."id" = f."menu_item_id"
    JOIN "menu" m ON m."id" = mi."menu_id"
    WHERE m."organization_id" = o."id" AND f."price_currency" IS NOT NULL
  );--> statement-breakpoint
UPDATE "offer" SET "price_specification" = "price_specification" - 'priceCurrency'
WHERE "price_specification" IS NOT NULL;--> statement-breakpoint
ALTER TABLE "ingredient" DROP COLUMN "price_currency";--> statement-breakpoint
ALTER TABLE "offer" DROP COLUMN "price_currency";