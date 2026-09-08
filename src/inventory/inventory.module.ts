import { Module } from '@nestjs/common';

import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { InventoryTransactionsService } from './inventory-transactions.service';
import { MenuItemInventoryController } from './menu-item-inventory.controller';
import { OrganizationInventoryController } from './organization-inventory.controller';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

@Module({
  controllers: [
    OrganizationInventoryController,
    IngredientsController,
    MenuItemInventoryController,
    RecipesController,
    SuppliersController,
  ],
  providers: [
    IngredientsService,
    InventoryTransactionsService,
    RecipesService,
    SuppliersService,
  ],
  exports: [InventoryTransactionsService, RecipesService],
})
export class InventoryModule {}
