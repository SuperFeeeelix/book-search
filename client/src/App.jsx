import './App.css';

//Here, we import the "Apollo" components necessary for interaction with our GraphQL API.
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

//Here, we import the "Outlet" component, which will helpu us render the components of the current route.
import { Outlet } from 'react-router-dom';

//Here, we import the "component" "Navbar", which will allow our app to render it, on the page.
import Navbar from './components/Navbar';

//Here, we designate the "uri" of the "graphql" server through which our app will access its data.
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//Here, we define a "new" instance of the "ApolloClient" that we imported above. . We will manage queries and store them as a "new" instance of the "InMemoryCache" component we imported from "Apollo" above.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

//Here, we give the app the abiity to "return" the contents of the "Navbar" and "Outlet" compnents". We wrap the entire app in an "ApolloProvider", which provides the "ApolloClient" instance to all components in our React app.
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

//Here, we export this code for use elsewhere in our app.
export default App;