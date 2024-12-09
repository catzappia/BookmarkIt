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
        bookId: ID!
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type Group {
        groupId: ID!
        name: String
        open: Boolean
        users: [User]
        currentBook: Book
        books: [Book]
    }

    type Post {
        postId: ID!
        text: String
        username: User
        comments: [Comment]
    }

    type Comment {
        commentId: ID!
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
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    
    input NewGroupInput {
        name: String!
        open: Boolean!
    }

    type Query {
        me: User
        allGroups: [Group]
    }
    
    type Mutation {
        addUser(input: NewUserInput): Auth
        login(email: String!, password: String!): Auth
        
        
        # Create a new group
        createGroup(name: String!): Group
        # Join a group
        joinGroup(groupId: ID!, userId: ID!): Group
        # Leave a group
        leaveGroup(groupId: ID!, userId: ID!): User
        # Delete a group
        deleteGroup(groupId: ID!): Boolean
        
        # Add a book to a group
        addBook(groupId: ID!, title: String!, author: String!, description: String): Book
        # Update book details
        updateBook(bookId: ID!, title: String, author: String, description: String): Book
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
