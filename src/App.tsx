import { UserProvider } from './context/UserProvider';
import UserList from './components/pages/UserList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <UserList />
      </div>
    </UserProvider>
  );
}

export default App;