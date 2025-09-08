import { Injectable } from "@nestjs/common";
import { Product } from "src/product/entities/product.entity";

@Injectable()
export abstract class ProductRepository {
    abstract create(product: Product): Promise<Product>;
    abstract findAll(): Promise<Product[]>;
    abstract findMany(ids: string[]): Promise<Product[]>;
    abstract findOne(id: string): Promise<Product|null>;
    abstract update(id: string, product: Partial<Product>): Promise<Product | null>;
    abstract remove(id: string): Promise<Product | null>;
}
