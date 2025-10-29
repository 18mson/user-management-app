import { UserProvider } from './context/UserProvider';
import UserList from './components/UserList';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <UserList />
      </div>
    </UserProvider>
  );
}

export default App;