import { ProductUnit } from './ProductUnit';

export type ConverterModel = {
  ProductBaseId: string;
  UnitBase: ProductUnit;
  AmountBase: string;
  ProductTargetId: string;
  UnitTarget: ProductUnit;
  AmountTarget: Array<string>;
};
