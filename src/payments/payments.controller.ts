import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePixPaymentDto } from './dto/create-pix-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("pix")
  createPixPayment(@Body() createPixPaymentDto: CreatePixPaymentDto) {
    return this.paymentsService.createPixPayment(createPixPaymentDto);
  }

  @Post("notification")
  notification(@Body() body: any) {
    new Logger("notification").log(body)
    return { message: "ok" }
  }
}
