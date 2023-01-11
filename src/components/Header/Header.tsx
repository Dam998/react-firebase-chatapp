import { memo, useContext, useMemo } from "react";
import { AuthContext } from "../../lib/context";
import { signInWithGoogle, signOut } from "../../lib/firebase";
import "./Header.scss";

const Header = () => {
    const { loading, user } = useContext(AuthContext);

    const loginButton = useMemo(() => {
        let callBack;
        let text;
        if (user) {
            callBack = signOut;
            text = "Logout";
        }
        else {
            callBack = signInWithGoogle;
            text = "Login";
        }

        return <button onClick={callBack} disabled={loading}>
            {loading ? "Loading..." : text}
        </button>
    }, [loading, user])

    return <header>
        <p>Chatapp</p>
        {loginButton}
    </header>
}

export default memo(Header);