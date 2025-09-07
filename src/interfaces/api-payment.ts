import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class ApiPayment {
    pixPayment(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}