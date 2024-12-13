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
    _id: ID!
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
  }

  type Group {
    _id: ID!
    name: String
    admin: String
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
    description: String
    admin: String!
  }

  input AddUserToGroupInput {
    groupId: ID!
    userId: ID!
  }

  input LeaveGroupInput {
    groupId: ID!
    userId: ID!
  }

  input AddPostToGroupInput {
    groupId: ID!
    username: String!
    text: String!
  }

  input AddCommentToPostInput {
    postId: ID!
    text: String!
    username: String!
  }

  type Query {
    me: User
  }

  type Query {
    # get single user by username
    allGroups: [Group]
    group(groupName: String): Group
    # Get all posts
    allPosts: [Post]
    # Get single user
    user(username: String!): User
  }

  type Mutation {
    addUser(input: NewUserInput): Auth
    login(email: String!, password: String!): Auth

    #Users
    # Add a book to a user's saved books
    # remove a book from a user's saved books
    addBookToGroupList(groupId: ID!, bookData: BookData!): Group

    # Create a group
    createGroup(input: NewGroupInput!): Group
    # Delete a group
    removeGroup(groupId: ID!): Group
    # Join a group
    addUserToGroup(input: AddUserToGroupInput): Group
    # Leave a group (having issues with this)
    leaveGroup(input: LeaveGroupInput!): Group
    # Update the current book for a group
    editGroupCurrentBook(groupId: ID!, bookData: BookData): Group
    # Add post to group (needs to be updated)
    addPostToGroup(input: AddPostToGroupInput): Group
    #add comment to post (needs to be updated)
    addCommentToPost(input: AddCommentToPostInput): Post

    # Add a book to user's saved books
    addBook(input: BookData, groupId: ID!): User

    # Remove a book from the group
    updateBook(
      bookId: ID!
      title: String
      author: String
      description: String
    ): Book
  }
`;
export default typeDefs;
