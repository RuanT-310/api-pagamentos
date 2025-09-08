import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/interfaces/product-repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ){}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.create(createProductDto);
  }
  async findAll() {
    return await this.productRepository.findAll();
  }

  async findMany(ids: string[]) {
    return await this.productRepository.findMany(ids);
  }


  async findOne(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepository.update(id, updateProductDto);
    if (!updatedProduct) {
      throw new HttpException('Product not found', 404);
    }
    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.productRepository.remove(id);
    if (!product) {
      throw new HttpException('Product not found', 404);
    }
  }
}
