import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
import { BaseContext, ContextFunction } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
dotenv.config();

export interface IApolloContext extends BaseContext {
  user: {
    username: string;
    email: string;
    _id: unknown;
  } | null;
}

export const authenticationToken: ContextFunction<
  [ExpressContextFunctionArgument],
  IApolloContext
> = async ({ req }) => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is sent in the authorization header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, return the request object as is
  if (!token) {
    return { user: null };
  }

  // Try to verify the token
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', {
      maxAge: '2hr',
    });
    // If the token is valid, attach the user data to the request object
    return { user: data };
  } catch (err) {
    // If the token is invalid, log an error message
    console.log('Invalid token on route: ', req.url);
    console.error(err);
  }

  // Return the request object
  return { user: null };
};

export const signToken = (username: string, email: string, _id: unknown) => {
  // Create a payload with the user information
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables

  // Sign the token with the payload and secret key, and set it to expire in 2 hours
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}