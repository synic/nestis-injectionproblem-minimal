import { Injectable } from '@nestjs/common';

@Injectable()
export class OtherService {
  async hello() {
    return 'hello world';
  }
}
