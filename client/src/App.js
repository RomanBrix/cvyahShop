import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Enter from './components/Enter';






const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache()
})

function App() {
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>hello</h1>
        <Enter/>
      </div>
    </ApolloProvider>
  );
}

export default App;
