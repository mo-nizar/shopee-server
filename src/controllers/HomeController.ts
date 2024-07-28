import { Router, Request, Response } from 'express';
import ProductController from './ProductController';
import mongoose from 'mongoose';

interface Body{
    [key: string]: string;
};

const HomeController = (record: string) => {

  const index = async () => {
    const products = await ProductController().fetchAll();
    const collections = await fetchCollectionNames();

    return { status: 200, message: 'Products fetched successfully', data: {
      products: products.data ?? [],
      collections: collections.data ?? [],
      defaultRecord: 'orders'
    } };
  };

  const fetchCollectionNames = async (): Promise<{
    status: number;
    message: string;
    data?: any;
  }> => {
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      const tableNames = collections.map(collection => collection.name);
      return { status: 200, message: 'Table names fetched successfully', data: tableNames };
    } catch (err) {
      return { status: 500, message: 'Error fetching table names', data: err };
    }
  };

  return { index, fetchCollectionNames };
};

export default HomeController;
