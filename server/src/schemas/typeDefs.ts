
import { gql } from "graphql-tag";
const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    bio: String
    profilePicture: String
    savedBooks: [Book]
    currentlyReading: Book
    adminGroups: [Group]
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
    admin: User
    description: String
    is_private: Boolean
    profilePicture: String
    users: [User]
    currentBook: Book
    books: [Book]
    posts: [Post]
  }

  type Post {
    _id: ID!
    text: String
    user: User
    comments: [Comment]
  }

  type Comment {
    _id: String
    text: String
    user: User
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
  }

  input AddUserToGroupInput {
    groupId: ID!
  }

  input LeaveGroupInput {
    groupId: ID!
  }

  input AddPostToGroupInput {
    groupId: ID!
    text: String!
  }

  input AddCommentToPostInput {
    postId: ID!
    text: String!
  }

  input DeletePostInput{
    postId: ID!
    groupId: ID!
  }

  type Query {
    # User Queries
    me: User
    user(username: String!): User
    userById(userId: ID!): User

    # Group Queries
    allGroups: [Group]
    group(groupName: String): Group
    groupById(groupId: ID!): Group
    groupsByIds(groupIds: [ID]!): [Group]

    # Post Queries
    allPosts: [Post]
    postsByGroupId(groupId: ID!): [Post]
  }

  type Mutation {
    # Auth Mutations
    addUser(input: NewUserInput): Auth
    login(email: String!, password: String!): Auth

    #Users Mutations
    addBookToGroupList(groupId: ID!, bookData: BookData!): Group
    addUserToGroup(input: AddUserToGroupInput): Group
    leaveGroup(input: LeaveGroupInput!): Group
    addBook(input: BookData, groupId: ID!): User
    editUserBio(newBio: String!): User

    # Group Mutations
    createGroup(input: NewGroupInput!): Group
    deleteGroup(groupId: ID!): Group
    editGroupCurrentBook(groupId: ID!, bookData: BookData): Group

    # Remove a book from the group
    updateBook(
      bookId: ID!
      title: String
      author: String
      description: String
    ): Book

    # Post & Comment Mutations
    addPostToGroup(input: AddPostToGroupInput): Post
    addCommentToPost(input: AddCommentToPostInput): Post
    deletePost(input:DeletePostInput!): Post
  }
`;
export default typeDefs;
