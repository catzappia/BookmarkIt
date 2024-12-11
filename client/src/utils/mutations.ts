import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: NewUserInput!) {
    addUser(input: $input) {
      user {
        username
        email 
        password
        _id
      }
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup($input: NewGroupInput!) {
    createGroup(input: $input) {
      _id
      name
      description
    }
  }
`

export const EDIT_GROUP_CURRENT_BOOK = gql`
  mutation editGroupCurrentBook($groupId: ID!, $bookData: BookData) {
    editGroupCurrentBook(groupId: $groupId, bookData: $bookData) {
      _id
      name
      description
      currentBook {
        title
        authors
        description
        image
      }
    }
  }
`;

export const ADD_USER_TO_GROUP = gql`
  mutation addUserToGroup($input: AddUserToGroupInput!) {
  addUserToGroup(input: $input) {
      _id
      users {
        _id
      }
      
    
      
      }
    }
  

`