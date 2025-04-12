import ChatComponent from "./Chat/ChatComponent.tsx";
import {useEffect, useState} from "react";
// import SecretKeyLogin from "./Auth/SecretKeyLogin.tsx";
import LoginOverlay from "./Auth/LoginOverlay.tsx";
import {getLocalStorageItem} from "../utilities/lib/localStorage.tsx";


const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const handleLogin = () => {
        if (!isLoggedIn) {
            setIsLoggedIn(true);
            window.location.reload();
        }
    }

    useEffect(() => {
        const token = getLocalStorageItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
        setIsCheckingAuth(false);
    }, [isLoggedIn])
    return (
        <div className="relative w-full h-screen">
            {isCheckingAuth ?
                (
                    <div className="flex items-center justify-center w-full h-screen">
                        <div className="loader"/>
                    </div>
                ) : (
                    <>
                        <ChatComponent/>
                        {!isLoggedIn && (
                            // <SecretKeyLogin onUnlock={() => setIsLoggedIn(true)}/>
                            <LoginOverlay onLoginSuccess={handleLogin}/>
                        )}
                    </>
                )}
        </div>
    );

}

export default Home;
