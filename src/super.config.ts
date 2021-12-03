import { registerAs } from '@nestjs/config';

export default registerAs('super', () => ({
  stuff: 'test',
}));
