//Here, we import the "gql" function from the "graphql-tag" library. It is useful in helping our code identify GraphQL "query" and "mutation" syntax.
import gql from "graphql-tag";

//Here, we define the required aspects of "LOG"GING "IN" a "USER" through a "mutation" of existing data: The "login" name itself (an "email" address), the associated "password" and the "token" that is issued when the new "USER" is created successfully. It sends these required variables to the server-side "resolver" file so that that file can locate the matching logic within it and help carry out the function of "LOG"GING "IN" the "USER".
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//Here, we define the required aspects of "ADD"ing a "USER" through "mutation": A user-provided "username", "email" address and "password" to associate with the new "USER", as well as the authentication "token" issued any time a "USER" (new or pre-existing) log-in is successful. It sends these required variables to the server-side "resolver" file so that that file can locate the matching logic within it and help carry out the function of "ADD"ING the "USER".
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//Here, we define the required aspects of "SEARCH"ing for a "BOOK" through "mutation". We call the function "searchBooks", passing "serachInput" (the "Book" name, entered by the user) as the variable. The data we want to receive about the "books" being searched is included between the { } and we return this object upon search. It sends these required variables to the server-side "resolver" file so that that file can locate the matching logic within it and help carry out the function of "ADD"ING the "USER".
export const SEARCH_BOOKS = gql`
  query searchBooks($searchInput: String!) {
    searchBooks(searchInput: $searchInput) {
      books {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;

//Here, we define the required aspects of "SAVE"ing a "BOOK" to a user's list of "SAVE"d "BOOK"s through "mutation": The user's "username" and "email" address, a list of "savedBooks" (that is already associated with the "USER"), a "Count" of "book"s in that existing list (which will be updated, once the new book is added to the list) and the details listed in the "savedBooks" object, (which are retrieved if those details are available in the database the user is querying). It sends these required variables to the server-side "resolver" file so that that file can locate the matching logic within it and help carry out the function of "SAVE"ing a "BOOK".
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: bookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

//Here, we define what information is "REMOVE"d from the list of books, when a given user chooses to do this. It sends these required variables to the server-side "resolver" file so that that file can locate the matching logic within it and help carry out the function of "REMOVE"ING a "BOOK".
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

//The above mutation definitions are exported from here and imported into the components in which each is utilized.