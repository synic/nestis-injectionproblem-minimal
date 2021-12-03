import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FooService } from './foo.service';
import superConfig from './super.config';

@Injectable()
export class SuperService {
  constructor(
    @Inject(superConfig.KEY) private config: ConfigType<typeof superConfig>,
    private fooService: FooService,
  ) {}

  async findOnly() {
    console.log(this.config.stuff);
    return this.fooService.findOne(1);
  }
}
