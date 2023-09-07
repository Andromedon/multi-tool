import { Product } from '../types/Product';
import { ProductUnit } from '../types/ProductUnit';

const products: Product[] = [
  { id: 1, name: 'Butter', concentration: 86, density: 1.33 },
  { id: 2, name: 'Oil', concentration: 100, density: 0.86 },
  { id: 3, name: 'Margarine', concentration: 81, density: 1.33 },
];

const rainbowColors: string[] = [
  'red',
  'darkorange',
  'gold',
  'green',
  'blue',
  'purple',
];

export const getProducts = async (): Promise<Product[]> => {
  return products;
};

export const getColor = (i: number): string => {
  if (rainbowColors.length > i) {
    return rainbowColors[i];
  }

  var index = Math.abs(rainbowColors.length - (i + 2 - rainbowColors.length));
  return rainbowColors[index];
};

export const getBaseAmountInGrams = (
  amount: number,
  unit: ProductUnit,
  product: Product,
): number => {
  switch (unit) {
    case ProductUnit.Milliliters:
      return product.density * amount;
    case ProductUnit.Glasses:
      return product.density * amount * 250;
    default:
      return amount;
  }
};

export const getTargetAmount = (
  amount: number,
  unit: ProductUnit,
  product: Product,
): number => {
  switch (unit) {
    case ProductUnit.Milliliters:
      return amount / product.density;
    case ProductUnit.Glasses:
      return amount / product.density / 250.0;
    default:
      return amount;
  }
};
