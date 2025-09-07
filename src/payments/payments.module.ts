import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { HttpModule } from '@nestjs/axios';
import { MpPayment } from 'src/mp-payment/mp-payment';
import { ApiPayment } from 'src/interfaces/api-payment';

@Module({
  imports: [HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, 
    { 
      provide: ApiPayment,
      useClass: MpPayment,
    }
],
})
export class PaymentsModule {}
