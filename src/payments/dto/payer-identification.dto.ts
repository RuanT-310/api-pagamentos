import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
//import { ApiProperty } from '@nestjs/swagger';

export class PayerIdentificationDto {
  /* @ApiProperty({
    description: 'Tipo de documento de identificação (ex: CPF)',
    example: 'CPF',
    required: false,
  }) */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type?: string;

  /* @ApiProperty({
    description: 'Número do documento de identificação',
    example: '12345678909',
    required: false,
  }) */
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  number?: string;
}