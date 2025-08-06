import { AppService } from './app.service';

import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
