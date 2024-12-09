import { signToken, AuthenticationError } from '../utils/auth.js';
import User, { IUser } from '../models/User.js';

interface Context {
    user?: IUser;
}

interface LoginArgs {
    input: {
        email: string,
        password: string
    }
}

interface AddUserArgs {
    input: {
        username: string,
        email: string,
        password: string
    }
}

const resolvers = {
  Query: {
    me: async (
      _parent: any,
      _args: any,
      context: Context
    ): Promise<IUser | null> => {
      if (!context.user) {
        throw new AuthenticationError("Not Logged In");
      }

      try {
        return await User.findOne({ _id: context.user._id });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get user");
      }
    },
  },
  Mutation: {
    login: async (
      _parent: any,
      { input }: LoginArgs
    ): Promise<{ token: string; user: IUser }> => {
      try {
        const user = await User.findOne({ email: input.email });

        if (!user) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await user.isCorrectPassword(input.password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error("Failed to login");
      }
    },
    addUser: async (
        _parent: any,
        { input }: AddUserArgs
    ): Promise<{ token: string; user: IUser }> => {
        const user = await User.create({ ...input });
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
    }
  },
};

export default resolvers;