import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payment, MercadoPagoConfig } from 'mercadopago';
import { randomUUID } from 'node:crypto';
import { ApiPayment } from "src/interfaces/api-payment";
import { CreatePixPaymentDto } from 'src/payments/dto/create-pix-payment.dto';

@Injectable()
export class MpPayment implements ApiPayment {
    private readonly paymentClient: Payment;
    constructor(
        private readonly configService: ConfigService,
    ) {
        const client = new MercadoPagoConfig({
        accessToken: this.configService.get('MERCADO_PAGO_ACCESS_TOKEN', ""),
        });
        this.paymentClient = new Payment(client);
    }  
    async pixPayment(createPixPaymentDto: CreatePixPaymentDto){
        const paymentBody = {
            transaction_amount: createPixPaymentDto.items.reduce((total, item) => total + item.unit_price * item.quantity, 0),
            description: createPixPaymentDto.description,
            payment_method_id: 'pix', // Mantemos 'pix' para o nosso foco
            payer: {
                email: createPixPaymentDto.payer.email,
                identification: {
                    type: createPixPaymentDto.payer.identification.type, // Supondo que você colete essa informação
                    number: createPixPaymentDto.payer.identification.number // Troque pelo CPF real
                }
            },
            notification_url: 'https://011a9fa44b08.ngrok-free.app/payments/notification',
            additional_info: {
                // Exemplo: informações do ite
                items: createPixPaymentDto.items,
                payer: {
                    first_name: createPixPaymentDto.payer.firstName, 
                    last_name: createPixPaymentDto.payer.lastName,
                }
            },
            external_reference: 'MP0001' + Date.now(), // Referência sua para a transação
        };
        
        try {
            const response = await this.paymentClient.create({
                body: paymentBody,
                // Usar uma idempotencyKey para evitar pagamentos duplicados
                requestOptions: { idempotencyKey: randomUUID() } 
            });
            if (!response) throw new HttpException("deu erro na response", 400)
            const qrCode = response.point_of_interaction?.transaction_data?.qr_code_base64;
            const qrCodeText = response.point_of_interaction?.transaction_data?.qr_code;
            const paymentId = response.id;
    
            return {
                qrCode,
                qrCodeText,
                paymentId,
                };
        } catch (error) {
            console.error('Erro ao gerar pagamento Pix:', error.message);
            throw new Error('Falha ao gerar o pagamento.');
        }
    }
}
