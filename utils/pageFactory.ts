import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { ProductDetailPage } from '../pages/productDetailPage'; // Importing the new ProductDetailPage
/**
 * A factory class for creating instances of different pages.
 */
export class PageFactory {
  /**
   * Returns an instance of the requested page.
   *
   * @param pageName - The name of the page to retrieve.
   * @returns An instance of the requested page.
   * @throws Will throw an error if the page name is not found.
   */
  public static getPage(pageName: string): LoginPage | InventoryPage | any { // Using union type for better type safety
    switch (pageName) {
      case 'LoginPage':
        return new LoginPage(); // Returns an instance of LoginPage
      case 'InventoryPage':
        return new InventoryPage(); // Returns an instance of InventoryPage
      case 'ProductDetailPage': // New Case Added
        return new ProductDetailPage();
      // Add more cases here as you create new Page Objects (e.g., 'CheckoutPage', 'ProductDetailPage')
      default:
        throw new Error(`Page "${pageName}" not found in PageFactory. Ensure the name is correct and it's added to the factory.`);
    }
  }
}
