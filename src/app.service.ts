import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h3>Hello World!</h3><p>Teste</p>';
  }
}
