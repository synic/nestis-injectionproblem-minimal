import { Module } from '@nestjs/common';
import { FooModule } from './foo.module';
import { SuperService } from './super.service';
import { SuperResolver } from './super.resolver';
import superConfig from './super.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FooModule, ConfigModule.forRoot({ load: [superConfig] })],
  providers: [SuperResolver, SuperService],
})
export class SuperModule {}
