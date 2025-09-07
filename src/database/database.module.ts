import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
    })],
})
export class DatabaseModule {}
