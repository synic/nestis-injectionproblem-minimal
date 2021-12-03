import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foo } from './foo.entity';
import { SuperModule } from './super.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      url: 'postgres://defiq:defiq@localhost:15432/defiq',
      entities: [Foo],
      logging: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      introspection: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    SuperModule,
  ],
})
export class AppModule {}
