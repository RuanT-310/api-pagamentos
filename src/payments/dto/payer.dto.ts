import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
//import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PayerIdentificationDto } from './payer-identification.dto';

export class PayerDto {
  /* @ApiProperty({
    description: 'Email do pagador',
    example: 'teste@teste.com',
  }) */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /* @ApiProperty({
    description: 'Objeto de identificação do pagador',
    type: PayerIdentificationDto,
  }) */
  @ValidateNested()
  @Type(() => PayerIdentificationDto)
  @IsNotEmpty()
  identification: PayerIdentificationDto;
}