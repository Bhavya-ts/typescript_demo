import { Request } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
declare global {
    namespace Express {
      interface Request {
        payload?: any; // Use a more specific type if you know the structure of 'payload'
      }
    }
  }

  export interface JwtPayload  extends Request{
    token: string | JwtPayload;
    // userId: string;
    // email: string;
    // role: string;
  }

  export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }