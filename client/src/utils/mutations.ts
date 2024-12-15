import { gql } from "@apollo/client";

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
`;

export const DELETE_GROUP = gql`
  mutation deleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId) {
      _id
      name
    }
  }
`;

export const EDIT_GROUP_CURRENT_BOOK = gql`
  mutation editGroupCurrentBook($groupId: ID!, $bookData: BookData) {
    editGroupCurrentBook(groupId: $groupId, bookData: $bookData) {
      _id
      name
      description
      currentBook {
        _id
        bookId
        title
        authors
        description
        image
      }
    }
  }
`;

export const ADD_BOOK_TO_GROUP_LIST = gql`
  mutation addBookToGroupList($groupId: ID!, $bookData: BookData!) {
    addBookToGroupList(groupId: $groupId, bookData: $bookData) {
      _id
      name
      description
      books {
        _id
        bookId
        title
        image
      }
    }
  }
`;

export const ADD_USER_TO_GROUP = gql`
  mutation addUserToGroup($input: AddUserToGroupInput!) {
    addUserToGroup(input: $input) {
      _id
      name
      description
      admin {
        _id
        username
      }
      users {
        _id
        username
      }
    }
  }
`;

export const LEAVE_GROUP = gql`
  mutation leaveGroup($input: LeaveGroupInput!) {
    leaveGroup(input: $input) {
      _id
      name
      users {
        _id
        username
      }
    }
  }
`;

export const ADD_POST_TO_GROUP = gql`
  mutation addPostToGroup($input: AddPostToGroupInput) {
    addPostToGroup(input: $input) {
      _id
      text
      user {
        _id
        username
      }
      comments {
        _id
        text
        user {
          _id
          username
        }
      }
    }
  }
`;

export const ADD_COMMENT_TO_POST = gql`
  mutation addCommentToPost($input: AddCommentToPostInput) {
    addCommentToPost(input: $input) {
      _id
      text
      user {
        _id
        username
      }
      comments {
        _id
        text
        user {
          _id
          username
        }
      }
    }
  }
`;
