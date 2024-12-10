import { gql} from '@apollo/client';

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
    }`;

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
}`;

export const QUERY_ALL_GROUPS = gql`
    query allGroups {
      allGroups {
        name
      }
    }`;

// export const QUERY_ALL_GROUPS = gql`
// query allGroups {
//   groups {
//     _id
//     name
//     open
//     admin {
//       _id
//       username
//     }
//     users {
//       _id
//       username
//     }
//     currentBook {
//       _id
//       title
//       authors
//       description
//       image
//       link
//     }
//     books {
//       _id
//       title
//       authors
//       description
//       image
//       link
//     }
//   }
// }`;
