import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bio
      profilePicture
      adminGroups {
        _id
        name
        profilePicture
      }
      savedBooks {
        _id
        title
      }
      groups {
        _id
        name
        profilePicture
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
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

export const QUERY_USER_BY_ID = gql`
  query userById($userId: ID!) {
    userById(userId: $userId) {
      _id
      username
    }
  }
`;

export const QUERY__SINGLE_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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

export const QUERY_ALL_GROUPS = gql`
  query allGroups {
    allGroups {
      _id
      name
      description
      profilePicture
      admin {
        _id
        username
        profilePicture
      }
    }
  }
`;

export const QUERY_GROUP_BY_NAME = gql`
  query group($groupName: String) {
    group(groupName: $groupName) {
      _id
      name
      description
      profilePicture
      admin {
        _id
        username
        profilePicture
      }
      is_private
      currentBook {
        _id
        bookId
        title
        authors
        description
        image
      }
      books {
        _id
        bookId
        title
        authors
        description
        image
      }
      users {
        _id
        username
      }
      posts {
        _id
        text
        user {
          _id
          username
          profilePicture
        }
        comments {
          _id
          text
          user {
            _id
            username
            profilePicture
          }
        }
      }
    }
  }
`;

export const QUERY_GROUP_BY_ID = gql`
  query groupById($groupId: ID!) {
    groupById(groupId: $groupId) {
      _id
      name
      description
      profilePicture
      admin {
        _id
        username
        profilePicture
      }
      is_private
      currentBook {
        _id
        bookId
        title
        authors
        description
        image
      }
      books {
        _id
        bookId
        title
        authors
        description
        image
      }
      users {
        _id
        username
      }
      posts {
        _id
        text
        user {
          _id
          username
          profilePicture
        }
        comments {
          _id
          text
          user {
            _id
            username
            profilePicture
          }
        }
      }
    }
  }
`;

export const QUERY_GROUPS_BY_IDS = gql`
  query groupsByIds($groupIds: [ID]!) {
    groupsByIds(groupIds: $groupIds) {
      _id
      name
      description
      profilePicture
      admin {
        _id
        username
        profilePicture
      }
      is_private
      currentBook {
        _id
        bookId
        title
        authors
        description
        image
      }
      books {
        _id
        bookId
        title
        authors
        description
        image
      }
      users {
        _id
        username
      }
    }
  }
`
  export const QUERY_POSTS_BY_GROUP_ID = gql`
    query postsByGroupId($groupId: ID!) {
      postsByGroupId(groupId: $groupId) {
        _id
        text
        user {
          _id
          username
          profilePicture
        }
        comments {
          _id
          text
          user {
            _id
            username
            profilePicture
          }
        }
      }
    } 
  `
;