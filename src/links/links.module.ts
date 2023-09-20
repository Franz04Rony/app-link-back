import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Link, user, userLink } from './entities';


@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [
    TypeOrmModule.forFeature([ Link, user, userLink ])
  ]
})
export class LinksModule {}
