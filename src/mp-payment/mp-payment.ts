import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payment, MercadoPagoConfig } from 'mercadopago';
import { randomUUID } from 'node:crypto';
import { ApiPayment } from "src/interfaces/api-payment";

interface PixPaymentDto {
    transaction_amount: number
    description: string
    paymentMethodId: string,
    email: string,
    identificationType: string,
    number: string
}
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
    async pixPayment(){
        const paymentBody = {
            transaction_amount: 2.0,
            description: 'dados.descricao',
            payment_method_id: 'pix', // Mantemos 'pix' para o nosso foco
            payer: {
            email: "ruan.rolim.137@gmail.com",
            // Informações de identificação para o pagador (recomendado)
            identification: {
                type: 'CPF', // Supondo que você colete essa informação
                number: '95749019047' // Troque pelo CPF real
            }
            },
            notification_url: 'https://011a9fa44b08.ngrok-free.app/payments/notification',
            additional_info: {
            // Exemplo: informações do ite
            items: [{
                id: 'AMANTES-DA-LUA-01',
                title: "dados.descricao",
                quantity: 1,
                unit_price: 2.00
            }],
            payer: {
                first_name: 'Nome do Cliente', // Coletar no front ou usar um bot
                last_name: 'Sobrenome',
            }
            },
            external_reference: 'MP0001'+ Date.now(), // Referência sua para a transação
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
