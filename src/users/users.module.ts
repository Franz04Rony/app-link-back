import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link, User } from 'src/links/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [

    ConfigModule,

    TypeOrmModule.forFeature([User, Link]),

    PassportModule.register({defaultStrategy: 'jwt'}),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: '2h'
          }
      })
    })

  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class UsersModule {}
