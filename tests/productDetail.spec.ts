import { test, expect } from '@playwright/test'; // Or 'chai' and 'mocha'
import { PageFactory } from '../utils/pageFactory';
import users from '../data/users.json';
import products from '../data/products.json';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { ProductDetailPage } from '../pages/productDetailPage';
import { logger } from '../utils/logging';


test.describe('Product Detail Page Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let productDetailPage: ProductDetailPage;


    test.beforeEach(async () => {
        loginPage = PageFactory.getPage('LoginPage') as LoginPage;
        inventoryPage = PageFactory.getPage('InventoryPage') as InventoryPage;
        productDetailPage = PageFactory.getPage('ProductDetailPage') as ProductDetailPage; // Instantiate PDP


        await loginPage.init(test.info().project.name);
        await inventoryPage.init(test.info().project.name);
        await productDetailPage.init(test.info().project.name); // Initialize PDP


        // Login as prerequisite
        await loginPage.navigate('/');
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        logger.info('Logged in for Product Detail Page test.');
    });


    test('Should navigate to product detail and add to cart', async () => {
        // Click on a product name from the inventory list to navigate to PDP
        await inventoryPage.click(`text=${products[0].name}`);
        logger.info(`Clicked on "${products[0].name}" to go to detail page.`);


        // Verify elements on PDP and add to cart
        expect(await productDetailPage.getProductName()).toContain(products[0].name);
        expect(await productDetailPage.getProductPrice()).toContain(products[0].price.toString());


        await productDetailPage.addProductToCartFromDetail();
        logger.info(`Added product from detail page.`);


        // Optionally verify cart count from inventory page
        await productDetailPage.navigateBackToProducts();
        expect(await inventoryPage.getCartItemCount()).toBe(1);
    });


    test.afterEach(async () => {
        await loginPage.closeBrowser();
    });
});
