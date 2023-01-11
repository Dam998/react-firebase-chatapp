import './App.scss';
import Chat from './components/Chat';
import Header from './components/Header';
import useAuth from './hook/useAuth';
import { AuthContext } from './lib/context';

function App() {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>
        <Header />
        <main>
            {auth.user && <Chat displayName={auth.user.displayName} />}
        </main>
    </AuthContext.Provider>;
}

export default App;
