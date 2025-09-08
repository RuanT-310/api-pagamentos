import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { HttpModule } from '@nestjs/axios';
import { MpPayment } from 'src/mp-payment/mp-payment';
import { ApiPayment } from 'src/interfaces/api-payment';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProductRepository } from 'src/interfaces/product-repository';
import { ProductMongooseRepository } from 'src/database/mongoose/product-mongoose.repository';

@Module({
  imports: [HttpModule, ProductModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, 
    { 
      provide: ApiPayment,
      useClass: MpPayment,
    },
],
})
export class PaymentsModule {}
