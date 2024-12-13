
import { signToken, AuthenticationError } from '../utils/auth.js';
import User from '../models/User.js';
import Group, { IGroup } from '../models/Group.js';
import { IBook } from '../models/Book.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

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

interface UserJoinGroupArgs {
  input: {
    groupId: string,
    userId: string

  }

}

interface RemoveGroupArgs {
  groupId: string
}

interface LeaveGroupArgs {

  input: {
    groupId: string
    userId: string
  }

}

interface AddPostToGroupArgs {
  input: {
    groupId: string,
    text: string,
    username: string
  }
}

interface AddCommentToPostArgs {
  input: {
    postId: string,
    text: string,
    username: string
  }
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        console.log(context.user);
        return User.findOne({ _id: context.user.email });
      }
      throw new AuthenticationError("You need to be logged in!");
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
    editGroupCurrentBook: async (_parent: any, { groupId, bookData }: any) => {
      try {
        return await Group.findOneAndUpdate( { _id: groupId }, { currentBook: bookData }, { new: true });
      } catch (err) {
        console.error(err);
        throw new Error("Failed to edit group current book");
      }
    },
    addBookToGroupList: async (_parent: any, { groupId, bookData }: any) => {
      try {
        return await Group.findOneAndUpdate( { _id: groupId }, { $addToSet: { books: bookData } } );
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
    addUserToGroup: async (_parent: any, { input: { groupId, userId } }: UserJoinGroupArgs,) => {
      try {

        const updatedGroup = await Group.findOneAndUpdate(
          { _id: groupId },
          {
            $addToSet: { users: userId },
          },
          { new: true } // new: true returns the updated document
        );
        await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { groups: groupId },
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
    leaveGroup: async (_parent: any, { input: { userId, groupId } }: LeaveGroupArgs,) => {
      try {


        const updatedGroup = await Group.findOneAndUpdate(
          { _id: groupId },
          { $pull: { users: userId } },
          { new: true }
        );
        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { groups: groupId } },
          { new: true }
        );
        return updatedGroup;

      } catch (err) {
        console.error(err);
        throw new Error("Failed to remove user from group");
      }

    },

    // add post to group
    addPostToGroup: async (_parent: any, { input: { groupId, text, username } }: AddPostToGroupArgs) => {
      try {
        const updatedGroup = await Group.findOneAndUpdate(
          { _id: groupId },
          {
            $push: { posts: { text, username } },
          },
          { new: true }
        );
        const post = await Post.create({ text, username });
        await User.findOneAndUpdate(
          { username },
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
    addCommentToPost: async (_parent: any, { input: { postId, text, username } }: AddCommentToPostArgs) => {
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: { comments: { text, username } },
          },
          { new: true }
        );
        const comment = await Comment.create({ text, username });
        await User.findOneAndUpdate(
          { username },
          {
            $push: { posts: comment._id, text },
          },
          { new: true }
        );
        
        return updatedPost;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to add comment to post");
      }
    }

  },
  };

  export default resolvers;
