// import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;