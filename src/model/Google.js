// models/googleVision.js
// const vision = require('@google-cloud/vision');
import vision from '@google-cloud/vision';
import { ProductSearchClient, ImageAnnotatorClient } from '@google-cloud/vision';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const client = new vision.ProductSearchClient({
    keyFilename: 'service-account-key.json'
  });

class GoogleVision {
    constructor() {
        this.productSearchClient = new ProductSearchClient({
          keyFilename: 'service-account-key.json'
        });
        this.imageAnnotatorClient = new ImageAnnotatorClient({
          keyFilename: 'service-account-key.json'
        });
      }
    //   async createProduct(productId, displayName, productCategory, location) {
    //     const { GOOGLE_PROJECT_ID } = process.env;
    //     const formattedParent = this.productSearchClient.locationPath(GOOGLE_PROJECT_ID, "us-west1");
    //     const product = { displayName, productCategory };
    
    //     const request = {
    //       parent: formattedParent,
    //       productId,
    //       product,
    //     };
    
    //     const [createdProduct] = await this.productSearchClient.createProduct(request);
    //     return createdProduct;
    //   }

  async searchSimilarProducts( location, productCategory, imagePath, filter) {
    const { GOOGLE_PROJECT_ID, GOOGLE_PRODUCT_SET_ID } = process.env;
    // const productSetPath = `projects/${GOOGLE_PROJECT_ID}/locations/us-west1/productSets/${GOOGLE_PRODUCT_SET_ID}`;
    // const imageBuffer = await fs.readFile(imagePath);
    const imageBase64 = imagePath.toString('base64');

    // const productSetPath = this.productSearchClient.productSetPath(GOOGLE_PROJECT_ID, location, GOOGLE_PRODUCT_SET_ID);

    const request = {
      image: { content: imageBase64 },
      features: [{ type: 'PRODUCT_SEARCH' }],
      imageContext: {
        productSearchParams: {
          productSet: GOOGLE_PRODUCT_SET_ID,
          productCategories: [productCategory],
          filter: filter,
        },
      },
    };
    try{
    const [response] = await this.imageAnnotatorClient.batchAnnotateImages({
      requests: [request],
    });
    console.log(response);
      const results = response['responses'][0]['productSearchResults']['results'];
      return results.map(result => ({
        productId: result['product'].name.split('/').pop(-1),
        displayName: result['product'].displayName,
        description: result['product'].description,
        productCategory: result['product'].productCategory,
      }));
    } catch(error){
      console.error(error);
      throw Error;
    }
  }
  async listProducts(location) {
    const { GOOGLE_PROJECT_ID } = process.env;
    const formattedParent = client.locationPath(GOOGLE_PROJECT_ID, "us-west1");
  
    const [products] = await client.listProducts({ parent: formattedParent });
    products.forEach(product => {
      console.log(`Product ID: ${product.name.split('/').pop()}`);
      console.log(`Product Display Name: ${product.displayName}`);
      console.log(`Product Category: ${product.productCategory}`);
      console.log('---');
    });
  }
  async addProductToProductSet(productSetId, productId, location) {
    const { GOOGLE_PROJECT_ID } = process.env;
    const productSetPath = this.productSearchClient.productSetPath(GOOGLE_PROJECT_ID, location, productSetId);
    const productPath = this.productSearchClient.productPath(GOOGLE_PROJECT_ID, location, productId);

    await this.productSearchClient.addProductToProductSet({
      name: productSetPath,
      product: productPath,
    });

    return { productSetPath, productPath };
  }
}

export default GoogleVision;