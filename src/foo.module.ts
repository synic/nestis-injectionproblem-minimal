import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooLoader } from './foo.loader';
import { FooService } from './foo.service';
import { Foo } from './foo.entity';
import { OtherService } from './other.service';

@Module({
  imports: [TypeOrmModule.forFeature([Foo])],
  providers: [FooLoader, FooService, OtherService],
  exports: [FooService, TypeOrmModule],
})
export class FooModule {}
