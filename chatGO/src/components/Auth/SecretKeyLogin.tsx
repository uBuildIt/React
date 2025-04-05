import React, {useState} from "react";
import {logIn} from "../../services/api/auth.tsx";
import {ToastContainer, toast} from 'react-toastify';

interface SecretKeyOverlayProps {
    onUnlock: (secretKey: string, poolKey?: string) => void;
}

const SecretKeyLogin: React.FC<SecretKeyOverlayProps> = ({onUnlock}) => {
    const [secretKey, setSecretKey] = useState("");
    const [poolKey, setPoolKey] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (secretKey.trim()) {
            onUnlock(secretKey.trim(), poolKey.trim() || undefined);
            logIn(
                {pathParams: {secretKey, poolKey},}
            ).then((res) => {
                toast(res.data)
            }).catch((e) => {
                toast.error(e)
            })
        }
    };

    return (
        <div className="absolute inset-0 bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4 text-center">Enter Secret Key</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Secret key"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Pool key"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        value={poolKey}
                        onChange={(e) => setPoolKey(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                        Unlock
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default SecretKeyLogin;
