import { Router, Request, Response } from 'express';
import ProductsModel from '../models/products.model';
import mongoose from 'mongoose';

const router = Router();

interface Body {
  record: string;
}

const ProductController = () => {

  const fetchAll = async (): Promise<{
    status: number;
    message: string;
    data?: any;
  }> => {
    try {
      const products = await ProductsModel.find();
      return { status: 200, message: 'Products fetched successfully', data: products };
    } catch (err) {
      return { status: 500, message: 'Error fetching products', data: err };
    }
  };

  const create = async (body: Body): Promise<{
    [key: string]: string | Number;
  }> => {
    // Implementation for creating a product
    return { message: 'Not implemented', status: 400 };
  };

  const update = async (body: Body): Promise<{
    [key: string]: string | Number;
  }> => {
    // Implementation for updating a product
    return { message: 'Not implemented', status: 400 };
  };



  return { fetchAll, create, update };
};

export default ProductController;
