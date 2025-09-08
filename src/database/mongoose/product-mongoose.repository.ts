import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRepository } from 'src/interfaces/product-repository';
import { Product } from 'src/product/entities/product.entity';
import { Product as ProductMongoEntity } from 'src/database/mongoose/product-mongoose.schema';

@Injectable()
export class ProductMongooseRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductMongoEntity.name)
    private readonly productRepository: Model<ProductMongoEntity>,
  ) {}
  async create(product: Product): Promise<Product> {
    const createdProduct = await this.productRepository.create(product);
    createdProduct.id = createdProduct._id.toString() as string
    console.log(product, createdProduct);
    return new Product({name: createdProduct.name, price: createdProduct.price, id: createdProduct.id});
  }
  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find().exec();
    return products.map((product) => new Product({ id: product.id, name: product.name, price: product.price }));
  }
  async findMany(ids: string[]): Promise<Product[]> {
    const products = await this.productRepository.find({ _id: { $in: ids } }).exec();
    return products.map(p => new Product({ id: p.id, name: p.name, price: p.price }))
  }
  async findOne(id: string) {
    const product = await this.productRepository.findById(id).exec();
    return product ? new Product({name: product.name, price: product.price, id: product.id}): null
  }
  async update(id: string, product: Partial<Product>) {
    const updatedProduct = await this.productRepository.findByIdAndUpdate(id, product, { new: true }).exec();
    return updatedProduct ? new Product({name: updatedProduct.name, price: updatedProduct.price, id: updatedProduct.id}) : null
  }
  async remove(id: string){
    const removedProduct = await this.productRepository.findByIdAndDelete(id).exec();
    return removedProduct ? new Product({name: removedProduct.name, price: removedProduct.price, id: removedProduct.id}) : null
  }

  
}
