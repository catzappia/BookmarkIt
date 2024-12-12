
import { gql } from "graphql-tag";
const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]
    currentlyReading: Book
    groups: [Group]
    posts: [Post]
    comments: [Comment]
  }

  type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
  }

  type Group {
      _id: ID!
      name: String
      description: String
      is_private: Boolean
      users: [User]
      currentBook: Book
      books: [Book]
      posts: [Post]
  }
    
  type Post {
    _id: ID!
    text: String
    username: User
    comments: [Comment]
  }

  type Comment {
    commentId: String
    text: String
    username: User
  }

  type Auth {
    token: ID!
    user: User
  }

  input NewUserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookData {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
}

input NewGroupInput {
  name: String!
  is_private: Boolean!
  currentBook: BookData
}

input AddUserToGroupInput {
  groupId: ID!
  userId: ID!

}

input leaveGroupInput {
  groupId: ID!
  userId: ID!
}

input AddPostToGroupInput {
  groupId: ID!
  username: String!
  text: String!
}






type Query {
  me: User
  allGroups: [Group]
  group(groupName: String): Group
  # Get all posts
  allPosts: [Post]
  allComments: [Comment]
}

type Mutation {
  addUser(input: NewUserInput): Auth
  login(email: String!, password: String!): Auth
  # Create a group
  createGroup(input: NewGroupInput!): Group
  # Delete a group
  removeGroup(groupId: ID!): Group
  # Join a group
  addUserToGroup(input: AddUserToGroupInput): Group
  # Leave a group (having issues with this)
  leaveGroup(groupId: ID!, userId: ID!): Group 
  # Update the current book for a group
  editGroupCurrentBook(groupId: ID!, bookData: BookData): Group

  
  # Add post to group
  addPostToGroup(input: AddPostToGroupInput): Group

  
  # Add a book to a group
  addBook(
      groupId: ID!
      title: String!
      author: String!
      description: String
    ): Book
  
  # Remove a book from the group
  removeBook(bookId: ID!, groupId: ID!): Boolean
  updateBook(
      bookId: ID!
      title: String
      author: String
      description: String
    ): Book
}
  `;
  export default typeDefs;
