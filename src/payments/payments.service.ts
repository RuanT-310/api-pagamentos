import { Injectable } from '@nestjs/common';
import { ApiPayment } from 'src/interfaces/api-payment';

@Injectable()
export class PaymentsService {  
  constructor(
    private readonly apiPayment: ApiPayment
  ) {}  
  async createPixPayment(createPaymentDto: any) {
    return this.apiPayment.pixPayment();
  }
}
