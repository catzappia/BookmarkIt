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

