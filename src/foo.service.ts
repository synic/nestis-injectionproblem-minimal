import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foo } from './foo.entity';
import { FooLoader } from './foo.loader';

@Injectable()
export class FooService {
  constructor(
    @InjectRepository(Foo) private fooRepository: Repository<Foo>,
    private fooLoader: FooLoader,
  ) {}

  async findOne(id: number) {
    await this.fooRepository.findOne(id);
    return await this.fooLoader.load('test');
  }
}
