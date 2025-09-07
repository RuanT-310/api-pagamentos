import { Injectable } from "@nestjs/common";
import { CreatePixPaymentDto } from "src/payments/dto/create-pix-payment.dto";

@Injectable()
export abstract class ApiPayment {
    pixPayment(createPixPaymentDto: CreatePixPaymentDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
}