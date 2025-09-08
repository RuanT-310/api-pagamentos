import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './mongoose/product-mongoose.schema';
import { ProductMongooseRepository } from './mongoose/product-mongoose.repository';

const DynamicMongooseModuleModule = MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])

@Module({
    imports: [MongooseModule.forRootAsync({
        useFactory: async (configService: ConfigService) => {
            const connection = configService.get<string>('MONGODB_URI');
            return {
                connectionFactory: (connection) => {
                    if (connection.readyState === 1) {
                    console.log('Database Connected successfully');
                    }
                    connection.on('connected', () => {
                        console.log('Database connected');
                    });
                    connection.on('disconnected', () => {
                    console.log('Database disconnected');
                    });
                    connection.on('error', (error) => {
                    console.log('Database connection failed! for error: ', error);
                    });

                    return connection;
                },
                uri: connection,
            }
        },
        inject: [ConfigService],
    }), DynamicMongooseModuleModule],
    providers: [ProductMongooseRepository],
    exports: [
        DynamicMongooseModuleModule,
        ProductMongooseRepository
    ],
})
export class DatabaseModule {}
