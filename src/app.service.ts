import { Injectable } from '@nestjs/common';
import { STRINGS } from './lib/config';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: STRINGS.SUCCESS,
      data: {
        name: 'fun of gods: api service',
        version: '1.0.0',
        env: process.env.NODE_ENV || 'development',
      },
    };
  }
}
