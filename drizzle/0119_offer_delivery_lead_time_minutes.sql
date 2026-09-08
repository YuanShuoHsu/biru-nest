ALTER TABLE "offer" ADD COLUMN "delivery_lead_time_minutes" integer;--> statement-breakpoint
UPDATE "offer" SET "delivery_lead_time_minutes" = round(
  ("delivery_lead_time"->>'value')::numeric
  * CASE lower(coalesce("delivery_lead_time"->>'unitText', ''))
      WHEN '小時' THEN 60 WHEN 'hour' THEN 60 WHEN 'hours' THEN 60 WHEN 'hr' THEN 60 WHEN 'h' THEN 60
      WHEN '秒' THEN 1.0/60 WHEN 'second' THEN 1.0/60 WHEN 'seconds' THEN 1.0/60 WHEN 'sec' THEN 1.0/60 WHEN 's' THEN 1.0/60
      ELSE 1
    END
)::integer
WHERE NULLIF("delivery_lead_time"->>'value', '') IS NOT NULL;--> statement-breakpoint
ALTER TABLE "offer" DROP COLUMN "delivery_lead_time";