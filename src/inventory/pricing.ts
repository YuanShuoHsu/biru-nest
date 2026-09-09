import { sql } from 'drizzle-orm';

import { UNIT_FACTORS } from 'src/common/constants/units';
import type { Ingredient } from 'src/db/schema/inventory';
import { ingredient } from 'src/db/schema/inventory';

type Package = Pick<
  Ingredient,
  'eligibleQuantity' | 'eligibleQuantityUnitCode' | 'price'
>;

export const baseQuantityOf = ({
  eligibleQuantity,
  eligibleQuantityUnitCode,
}: Package): number | null =>
  eligibleQuantity && eligibleQuantityUnitCode
    ? Number(eligibleQuantity) * UNIT_FACTORS[eligibleQuantityUnitCode]
    : null;

export const unitPriceOf = (row: Package): number | null => {
  const baseQuantity = baseQuantityOf(row);

  return row.price && baseQuantity ? Number(row.price) / baseQuantity : null;
};

export const pricingOf = (row: Package) => ({
  packageBaseQuantity: baseQuantityOf(row),
  packageQuantity: row.eligibleQuantity,
  packageUnitCode: row.eligibleQuantityUnitCode,
  unitPrice: unitPriceOf(row),
});

export const packageBaseQuantitySql = sql`(${ingredient.eligibleQuantity} * case ${sql.join(
  Object.entries(UNIT_FACTORS).map(
    ([code, factor]) =>
      sql`when ${ingredient.eligibleQuantityUnitCode} = ${code} then ${factor}::numeric`,
  ),
  sql` `,
)} end)`;

export const unitPriceSql = sql`(${ingredient.price} / nullif(${packageBaseQuantitySql}, 0))`;
