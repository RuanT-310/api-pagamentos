import { Injectable } from '@nestjs/common';
import { ApiPayment } from 'src/interfaces/api-payment';
import { CreatePixPaymentDto } from './dto/create-pix-payment.dto';

@Injectable()
export class PaymentsService {  
  constructor(
    private readonly apiPayment: ApiPayment
  ) {}  
  async createPixPayment(createPixPaymentDto: CreatePixPaymentDto) {
    return this.apiPayment.pixPayment(createPixPaymentDto);
  }
}
