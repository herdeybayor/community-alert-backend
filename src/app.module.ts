import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { IsUnique } from './is-unique/is-unique';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize'),
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mailer.host'),
          port: configService.get<number>('mailer.port'),
          secure: configService.get('mailer.secure'),
          auth: {
            user: configService.get('mailer.user'),
            pass: configService.get('mailer.password'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        // preview: true,
        template: {
          dir: __dirname + '/template/',
          adapter: new PugAdapter({ inlineCssEnabled: true }),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [IsUnique],
})
export class AppModule {}
