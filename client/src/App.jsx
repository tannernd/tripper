import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css'
import Navbar from './components/Navbar';
import { createUploadLink} from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({uri:'/graphql'}),
  uri:'/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [count, setCount] = useState(0)

  return (

    <ApolloProvider client={client}>
        <Navbar />
         <Outlet />
    </ApolloProvider>
    
   
  );
}

export default App
