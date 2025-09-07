import { Controller, Get  } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return {
      nome: 'Amantes da Lua',
      produto: 'Serviço de Tecnologia',
      preco: '1.250,00'
    };
  }

  @Get("/product")
  product() {
    return { 
      productName: 'Serviço de Tecnologia Amantes da Lua',
      price: 1250.00 
    };
  }
}
