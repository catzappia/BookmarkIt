const typeDefs = `
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
    
    input LoginInput {
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

    type Query {
        me: User
    }
    
    type Mutation {
        addUser(input: NewUserInput!): Auth
        login(input: LoginInput!): Auth
    }
`;

export default typeDefs;