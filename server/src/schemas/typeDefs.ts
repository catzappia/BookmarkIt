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
    authors: [String]!
    description: String
    title: String!
    image: String
  }

  input NewGroupInput {
    name: String!
    description: String
  }

  input UserJoinGroupInput {
    groupId: String
  }

  type Query {
    me: User
    allGroups: [Group]
    group(groupName: String): Group
  }

  type Mutation {
    ## User Mutations
    addUser(input: NewUserInput): Auth
    login(email: String!, password: String!): Auth

    ## Group Mutations
    createGroup(input: NewGroupInput!): Group
    editGroupCurrentBook(groupId: ID!, bookData: BookData): Group
    addBookToGroupList(groupId: ID!, bookData: BookData!): Group
  }
`;

export default typeDefs;
