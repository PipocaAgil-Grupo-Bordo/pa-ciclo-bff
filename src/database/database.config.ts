import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('DATABASE_HOST'),
    port: configService.getOrThrow<number>('DATABASE_PORT'),
    username: configService.getOrThrow<string>('DATABASE_USERNAME'),
    password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
    database: configService.getOrThrow<string>('DATABASE_NAME'),
    autoLoadEntities: true,
    migrations: [
      /*...*/
    ],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.getOrThrow('POSTGRES_SYNC'),
  };
};
