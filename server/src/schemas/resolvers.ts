import { signToken, AuthenticationError } from "../utils/auth.js";
import User from "../models/User.js";
import Group, { IGroup } from "../models/Group.js";
import { IBook } from "../models/Book.js";

interface LoginArgs {
  email: string;
  password: string;
}

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface CreateGroupArgs {
    input: {
        name: string,
        is_private: boolean,
        currentBook: IBook

    }
}

interface UserJoinGroupInput {
    input: {
        groupId: string
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
    group: async (_parent: any, { groupName }: any): Promise<IGroup | null> => {
      try {
        return await Group.findOne({ name: groupName });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get group");
      }
    },
  },
  Mutation: {
    login: async (_parent: any, { email, password }: LoginArgs) => {
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
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    createGroup: async (_parent: any, { input }: CreateGroupArgs) => {
        try {
            return await Group.create({ ...input });
        } catch (err) {
            console.error(err);
            throw new Error("Failed to create group");
      }
    },
    // Users can join groups
    joinGroup: async (_parent: any, { input }: UserJoinGroupInput, context :any) => {
        if (!context.user) {
            throw new AuthenticationError("Not Logged In");
        }
        try {
            const group = await Group.findOne({ _id: input.groupId });
            if (!group) {
                throw new Error("No group found with this id");
            }
            if (!group.users) {
                group.users = [];
            }
            group.users.push(context.user._id);
            await group.save();
            return group;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to join group");
        }
  },
  },
};

export default resolvers;
