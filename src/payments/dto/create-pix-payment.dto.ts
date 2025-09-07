import { IsString, IsNotEmpty, IsNumber, ValidateNested, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
//import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PayerDto } from './payer.dto';
import { ItemDto } from './item.dto';

export class CreatePixPaymentDto {
  /* @ApiProperty({
    description: 'Descrição da compra',
    example: 'Assinatura anual de serviço',
  }) */
  @IsString()
  @IsNotEmpty()
  description: string;

  /* @ApiProperty({
    description: 'Dados do pagador',
    type: PayerDto,
  }) */
  @ValidateNested()
  @Type(() => PayerDto)
  @IsNotEmpty()
  payer: PayerDto;

  @ArrayNotEmpty({ message: 'Items array should not be empty' })
  @ValidateNested({ each: true, message: 'Each ponto must be a valid object' })
  @Type(() => ItemDto)
  @IsNotEmpty()
  items: ItemDto[];
}