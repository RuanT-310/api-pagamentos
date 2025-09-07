import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("pix")
  createPixPayment(@Body() createPaymentDto: any) {
    return this.paymentsService.createPixPayment(createPaymentDto);
  }

  @Post("notification")
  notification(@Body() body: any) {
    console.log(body)
    return {message: "ok"}
  }
}
