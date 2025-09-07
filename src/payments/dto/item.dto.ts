import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ItemDto {
    @IsString()
    @IsNotEmpty()
    id: string;
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    @IsNumber()
    @IsNotEmpty()
    unit_price: number;
}