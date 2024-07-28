import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { userModel, validateUser } from '../models/users.model';
import jwt from 'jsonwebtoken';
const router = Router();

interface Body{
    [key: string]: string;
};



const UserController = () => {
  let message = 'Something went wrong';
  let status = 400;

  const fetchAll = async (): Promise<{
    status: number;
    message: string;
    data?: any;
  }> => {
    try {
      const users = await userModel.find();
      return { status: 200, message: 'Users fetched successfully', data: users };
    } catch (err) {
      return { status: 500, message: 'Error fetching users', data: err };
    }
  };

  const signup = async (body: Body) => {
    // Example validation placeholder
    const { error } = validateUser(body); // replace this with actual validation logic          
    if (error) {
      return { message: (error as any)?.details[0]?.message, status: 400 };
    }

    let user = await User.findOne({ email: body.email });
    if (user) {
      return { message: 'User already exists. Please sign in', status: 400 };
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const newUser = new User({
          name: body.name,
          email: body.email,
          password: hashedPassword,
          is_admin: body.is_admin,
          is_enabled: true,
        });        
        await newUser.save();
        return { message: 'success', status: 200, user: { email: newUser.email} };
      } catch (err) {
        return { message: (err as Error)?.message, status: 400 };
      }
    }
  };

  const login = async (body: Body): Promise<{
    status?: number;
    message?: string;
    data?: {
      email: string;
      token: string;
    }
  }> => {
    if (!body.email || !body.password) {
      return { message: 'Email and password are required', status: 400 };
    }

    const error = {};

    let user = await User.findOne({ email: body.email });
    if (!user) {
      return { message: 'Invalid email or password', status: 400 };
    }

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      return { message: 'Invalid email or password', status: 400 };
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, email: user.email, is_admin: user.is_admin }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    return {
      status: 200,
      message: 'Login successful',
      data: {
        email: user.email,
        token: token
      }
    };
  };

  return { signup, login };
};

export default UserController;
