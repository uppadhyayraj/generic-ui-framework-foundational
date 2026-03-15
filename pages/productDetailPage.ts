import { BasePage } from './basePage';
import { logger } from '../utils/logging';


export class ProductDetailPage extends BasePage {
    private readonly productNameSelector = '.inventory_details_name';
    private readonly productDescriptionSelector = '.inventory_details_desc';
    private readonly productPriceSelector = '.inventory_details_price';
    private readonly addToCartButton = 'button.btn_primary.btn_inventory';
    private readonly backToProductsButton = 'button.btn_secondary';


    constructor() {
        super();
    }


    async getProductName(): Promise<string | null> {
        return await this.getText(this.productNameSelector);
    }


    async getProductDescription(): Promise<string | null> {
        return await this.getText(this.productDescriptionSelector);
    }


    async getProductPrice(): Promise<string | null> {
        return await this.getText(this.productPriceSelector);
    }


    async addProductToCartFromDetail(): Promise<void> {
        await this.click(this.addToCartButton);
        logger.info('Added product to cart from Product Detail Page.');
    }


    async navigateBackToProducts(): Promise<void> {
        await this.click(this.backToProductsButton);
        logger.info('Navigated back to products page.');
    }
}
