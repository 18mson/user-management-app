import { UserProvider } from './context/UserProvider';
import UserList from './components/pages/UserList';

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