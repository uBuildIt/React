import React, {useState} from "react";
import {logIn} from "../../services/api/auth.tsx";
import {ToastContainer, toast} from 'react-toastify';
import {setLocalStorageItem} from "../../utilities/lib/localStorage.tsx"

interface LoginOverlayProps {
    onLoginSuccess: () => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({onLoginSuccess}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in with", {email, password});
        logIn(
            {data: {email: email, password: password}},
        ).then((res) => {
            console.log(res.data);
                if (res.data.error) {
                    toast.error(res.data.message);
                } else {
                    setLocalStorageItem("token", res.data.data.token);
                    onLoginSuccess()
                }
            }
        ).catch((err) => {
            toast.error(err.response.data);
        })
    };

    return (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default LoginOverlay;

