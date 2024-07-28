import express from 'express';
import cors from 'cors';
import productRoutes from '../routes/product.routes';
import userRoutes from '../routes/user.routes';
import orderRoutes from '../routes/order.routes';
import homeRoutes from '../routes/home.routes';


const App = async () => {
  const server = express();

  // Use CORS middleware with custom configuration
  server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'auth-token', 
      'security-token', 
      'app-version', 
      'request-timestamp', 
      'cache-control', 
    ],
  }));

  server.use(express.json());

  server.use(homeRoutes);
  server.use('/prod', productRoutes);
  server.use('/user', userRoutes);
  server.use('/order', orderRoutes);


  // Uncomment and add your route imports and middlewares
  // server.use(express.static('public/assets/images'));
  // server.use(express.static('public/files'));
  // server.use(express.static('public/files/sales'));
  // server.use('/services', serviceRoutes);
  // server.use('/sales', salesRoutes);
  // server.use('/dashboard', dashboardRoutes);
  // server.use(homeRoutes);

  return server;
};

export default App;
