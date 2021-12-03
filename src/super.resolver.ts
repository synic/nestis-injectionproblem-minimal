import { Injectable } from '@nestjs/common';
import { SuperService } from './super.service';
import { Resolver, Query } from '@nestjs/graphql';

@Injectable()
@Resolver()
export class SuperResolver {
  constructor(private superService: SuperService) {}

  @Query(() => String, { nullable: true })
  async getUser() {
    return await this.superService.findOnly();
  }
}
