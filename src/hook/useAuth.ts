import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    return {
        user,
        loading
    };
};

export default useAuth;
