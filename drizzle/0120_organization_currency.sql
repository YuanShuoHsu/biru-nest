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
      LEFT JOIN "menu_section" ms ON ms."id" = mi."menu_section_id"
      JOIN "menu" m ON m."id" = coalesce(mi."menu_id", ms."menu_id")
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
  SELECT "organization_id", max("price_currency") AS "currency"
  FROM (
    SELECT m."organization_id", f."price_currency"
    FROM "offer" f
    JOIN "menu_item" mi ON mi."id" = f."menu_item_id"
    LEFT JOIN "menu_section" ms ON ms."id" = mi."menu_section_id"
    JOIN "menu" m ON m."id" = coalesce(mi."menu_id", ms."menu_id")
    WHERE f."price_currency" IS NOT NULL
    UNION
    SELECT "organization_id", "price_currency"
    FROM "ingredient"
    WHERE "price_currency" IS NOT NULL
  ) pairs
  GROUP BY "organization_id"
) c
WHERE o."id" = c."organization_id";--> statement-breakpoint
UPDATE "offer" SET "price_specification" = "price_specification" - 'priceCurrency'
WHERE "price_specification" IS NOT NULL;--> statement-breakpoint
ALTER TABLE "ingredient" DROP COLUMN "price_currency";--> statement-breakpoint
ALTER TABLE "offer" DROP COLUMN "price_currency";
