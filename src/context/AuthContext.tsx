import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "@/src/firebase/config_firebase";

interface AuthContextProps {
    isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
