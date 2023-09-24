import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link, User} from 'src/links/entities';
import { UserLink } from 'src/links/entities/userLink.entity';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([ Link, User, UserLink])
  ]
})
export class UsersModule {}