import { signToken, AuthenticationError } from '../utils/auth.js';
import User  from '../models/User.js';
import Group, { IGroup} from '../models/Group.js';


interface LoginArgs {
    
  email: string;
  password: string;
    
}

interface AddUserArgs {
    input: {
        username: string,
        email: string,
        password: string
    }
}

interface CreateGroupArgs {
    input: {
        name: string,
        open: boolean,
    }
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("Not Logged In");
      }

      try {
        return await User.findOne({ _id: context.user.email });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get user");
      }
    },
    allGroups: async (_parent: any, _args: any): Promise<IGroup[]> => {
      try {
        return await Group.find({});
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get groups");
      }
    },
  },
  Mutation: {
    login: async (_parent: any,{ email, password }: LoginArgs) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        const token = signToken(user.username, user.email, user.id);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error("Failed to login");
      }
    },
    addUser: async (_parent: any,{ input }: AddUserArgs) => {
        const user = await User.create({ ...input });
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
    },
    createGroup: async ( _parent: any, { input }: CreateGroupArgs, context: any): Promise<IGroup> => {
        if (!context.user) {
            throw new AuthenticationError("Not Logged In");
        }

        try {
            const group = await Group.create({ ...input, admin: context.user._id });
            return group;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to create group");
        }
    },
  },
}

export default resolvers;