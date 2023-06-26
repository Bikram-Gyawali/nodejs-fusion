import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
