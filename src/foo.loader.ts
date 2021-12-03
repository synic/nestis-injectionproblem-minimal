import { Injectable, Scope } from '@nestjs/common';
import { DataLoader } from './dataloader.class';
import { OtherService } from './other.service';

@Injectable({ scope: Scope.REQUEST })
export class FooLoader extends DataLoader<string, string> {
  constructor(private otherService: OtherService) {
    super();
  }

  async perform(keys: string[]): Promise<string[]> {
    console.log(await this.otherService.hello());
    return keys;
  }
}
