import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from 'src/interfaces/product-repository';
import { ProductMongooseRepository } from 'src/database/mongoose/product-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/database/mongoose/product-mongoose.schema';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ProductController],
  providers: [ProductService,
    {
      provide: ProductRepository,
      useClass: ProductMongooseRepository,
    }
  ],
  exports: [ProductService]
})
export class ProductModule {}
