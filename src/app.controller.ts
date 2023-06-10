import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

type BodySumNumbers = {
  a: number;
  b: number;
};

@Controller('sum')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sumNumbers(@Query('a') a: string, @Query('b') b: string): number {
    console.log(a, b);
    return parseFloat(a) + parseFloat(b);
  }
}
