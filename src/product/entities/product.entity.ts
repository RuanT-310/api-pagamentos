export class Product {
    public readonly id?: string;
    public readonly name!: string;
    public readonly price!: number;
    constructor(props: Product) {
        Object.assign(this, props)
    }
}
