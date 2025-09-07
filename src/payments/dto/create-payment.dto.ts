import { IsString, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
//import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PayerDto } from './payer.dto';

export class CreatePaymentDto {
  /* @ApiProperty({
    description: 'Valor total da transação',
    example: 1500.00,
  }) */
  @IsNumber()
  @IsNotEmpty()
  transaction_amount: number;

  /* @ApiProperty({
    description: 'Descrição da compra',
    example: 'Assinatura anual de serviço',
  }) */
  @IsString()
  @IsNotEmpty()
  description: string;

  /* @ApiProperty({
    description: 'ID do método de pagamento (ex: pix, boleto)',
    example: 'pix',
  }) */
  @IsString()
  @IsNotEmpty()
  payment_method_id: string;

  /* @ApiProperty({
    description: 'Dados do pagador',
    type: PayerDto,
  }) */
  @ValidateNested()
  @Type(() => PayerDto)
  @IsNotEmpty()
  payer: PayerDto;
}