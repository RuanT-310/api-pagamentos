import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePixPaymentDto } from './dto/create-pix-payment.dto';
import { CreatePixPayment2Dto } from './dto/create-pix-payment-2.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("pix")
  createPixPayment(@Body() createPixPaymentDto: CreatePixPayment2Dto) {
    return this.paymentsService.createPixPayment2(createPixPaymentDto);
  }

  @Post("notification")
  notification(@Body() body: any) {
    new Logger("notification").log(body)
    return { message: "ok" }
  }
}
