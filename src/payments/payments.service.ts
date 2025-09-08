import { Injectable } from '@nestjs/common';
import { ApiPayment } from 'src/interfaces/api-payment';
import { CreatePixPaymentDto } from './dto/create-pix-payment.dto';
import { CreatePixPayment2Dto } from './dto/create-pix-payment-2.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class PaymentsService {  
  constructor(
    private readonly apiPayment: ApiPayment,
    private readonly productService: ProductService
  ) {}  
  async createPixPayment(createPixPaymentDto: CreatePixPaymentDto) {
    return this.apiPayment.pixPayment(createPixPaymentDto);
  }
  async createPixPayment2({products, ...data}: CreatePixPayment2Dto) {
    const productsIds = products.map(item => item.id)
    const productsList = await this.productService.findMany(productsIds)
    const items = productsList.map(product => ({
      "id": product.id as string,
      "title": product.name,
			"quantity": (products.find(item => item.id === product.id) as { quantity: number }).quantity,
			"unit_price": product.price
    }))
    return this.apiPayment.pixPayment({
      ...data,
      items
    });
  }
}
