import {
  signToken,
  AuthenticationError,
  IApolloContext,
} from "../utils/auth.js";
import User from "../models/User.js";
import Group, { IGroup } from "../models/Group.js";
// import { IBook } from '../models/Book.js';
import Post from "../models/Post.js";


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
    name: string;
    description: string;
  };
}

interface UserJoinGroupArgs {
  input: {
    groupId: string;
  };
}

interface RemoveGroupArgs {
  groupId: string;
}

interface LeaveGroupArgs {
  input: {
    groupId: string;
  };
}

interface AddPostToGroupArgs {
  input: {
    groupId: string;
    text: string;
  };
}

interface AddCommentToPostArgs {
  input: {
    postId: string;
    text: string;
  };
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IApolloContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        return await User.findOne({ _id: context.user._id });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get user");
      }
    },
    
    userById: async (_parent: any, { userId }: any) => {
      try {
        return await User.findOne({ _id: userId });
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
    groupById: async (
      _parent: any,
      { groupId }: any
    ): Promise<IGroup | null> => {
      try {
        return await Group.findOne({ _id: groupId });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get group");
      }
    },
    groupsByIds: async (
      _parent: any,
      { groupIds }: any,
      context: IApolloContext
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const groups = await Group.find({ _id: { $in: groupIds } });
        return groups;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to get groups");
      }
    },
  },
  Mutation: {
    login: async (_parent: any, { email, password }: LoginArgs) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user.username, user.email, user.id);
      return { token, user };
    },
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    //   saveBook: async (_parent: any, { input }: {input: SaveBookArgs}, context: any) => {
    //     // if user is authenticated
    //     if (context.user) {
    //         const updatedUser = await User.findOneAndUpdate(
    //             { _id: context.user.email },
    //             { $addToSet: { savedBooks: input } },
    //             { new: true, runValidators: true }
    //         );
    //         return updatedUser;
    //     }
    //     // if user is not authenticated return an error
    //     throw new AuthenticationError('You need to be logged in!');
    // },
    createGroup: async (
      _parent: any,
      { input }: CreateGroupArgs,
      context: IApolloContext
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      console.log(
        "Context.user: ",
        context.user,
        "Context.user._id: ",
        context.user._id
      );
      console.log(
        "Input.name: ",
        input.name,
        "Input.description: ",
        input.description
      );
      try {
        const newGroup = await Group.create({
          ...input,
          admin: context.user._id,
        });
        console.log("New Group: ", newGroup);
        console.log("New Group ID: ", newGroup._id);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { adminGroups: newGroup._id } },
          { new: true }
        );
        console.log("Updated User: ", updatedUser);
        console.log({ newGroup, updatedUser });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create group");
      }
    },
    editGroupCurrentBook: async (_parent: any, { groupId, bookData }: any) => {
      try {
        return await Group.findOneAndUpdate(
          { _id: groupId },
          { currentBook: bookData },
          { new: true }
        );
      } catch (err) {
        console.error(err);
        throw new Error("Failed to edit group current book");
      }
    },
    addBookToGroupList: async (_parent: any, { groupId, bookData }: any) => {
      try {
        return await Group.findOneAndUpdate(
          { _id: groupId },
          { $addToSet: { books: bookData } }
        );
      } catch (err) {
        console.error(err);
        throw new Error("Failed to add book to group list");
      }
    },

    //remove group
    removeGroup: async (_parent: any, { groupId }: RemoveGroupArgs) => {
      try {
        return await Group.findOneAndDelete({ _id: groupId });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to edit group current book");
      }
    },

    // Users can join a group
    addUserToGroup: async (_parent: any,{ input }: UserJoinGroupArgs,context: IApolloContext) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        const updatedGroup = await Group.findOneAndUpdate(
          { _id: input.groupId },
          {
            $addToSet: { users: context.user._id },
          },
          { new: true } // new: true returns the updated document
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { groups: input.groupId },
          },
          { new: true }
        );
        return updatedGroup;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to add user to group");
      }
    },
    // Users can leave a group
    leaveGroup: async (_parent: any,{ input }: LeaveGroupArgs,context: IApolloContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const updatedGroup = await Group.findOneAndUpdate(
          { _id: input.groupId },
          { $pull: { users: context.user._id } },
          { new: true }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { groups: input.groupId } },
          { new: true }
        );
        return updatedGroup;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to remove user from group");
      }
    },

    // add post to group
    addPostToGroup: async (_parent: any,{ input: { groupId, text, } }: AddPostToGroupArgs, context:IApolloContext) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        const post = await Post.create({ text, user: context.user._id });
        const updatedGroup = await Group.findOneAndUpdate(
          { _id: groupId },
          {
            $push: { posts: post._id },
          },
          { new: true }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { posts: post._id },
          },
          { new: true }
        );
        return updatedGroup;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to add post to group");
      }
    },

    // add comment to post
    addCommentToPost: async (
      _parent: any,
      { input: { postId, text, } }: AddCommentToPostArgs, context: IApolloContext) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: { comments: { text, user:context.user._id } },
          },
          { new: true }
        );
        

        

        return updatedPost;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to add comment to post");
      }
    },
  },
};

export default resolvers;
