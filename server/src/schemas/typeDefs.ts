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
        is_private: Boolean
        users: [User]
        currentBook: Book
        books: [Book]
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

    input addUserToGroupInput {
        groupId: ID!
        userId: ID!
      
    }
   
    input BookInput {
    author: [String]
    title: String, 
    author: String, 
    description: String,
    image: String,
    bookId: String
    }
  
    

    
    
    
    type Query {
        me: User
        allGroups: [Group]
        group(groupName: String): Group
    }
    
    type Mutation {
        addUser(input: NewUserInput): Auth
        login(email: String!, password: String!): Auth
        # Create a group
        createGroup(input: NewGroupInput!): Group
        # Delete a group
        removeGroup(groupId: ID!): Group
        # Join a group
        addUserToGroup(input: addUserToGroupInput): Group
        # Leave a group
        leaveGroup(groupId: ID!, userId: ID!): Group
      
        
        # Add a book to a group
        addBook(groupId: ID!,  ): Book
        # Update book details
        updateBook(bookId: ID!, ): Book
        # Remove a book from the group
        removeBook(bookId: ID!, groupId: ID!): Boolean

        # Create a post within a group
        createPost(groupId: ID!, userId: ID!, content: String!): Post
        # Update an existing post
        updatePost(postId: ID!, content: String): Post
        # Delete a post
        deletePost(postId: ID!): Boolean

        # Add a comment to a post
        addComment(postId: ID!, userId: ID!, content: String!): Comment
        # Update a comment
        updateComment(commentId: ID!, content: String): Comment
        # Delete a comment
        deleteComment(commentId: ID!): Boolean
}
    
`;

export default typeDefs;
