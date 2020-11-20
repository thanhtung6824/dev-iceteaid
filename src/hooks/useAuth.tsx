import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

export function useProvideAuth(): { isAuthenticated: boolean } {
    const [stringToken] = useLocalStorage('token', '');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const now = Math.floor(Date.now() / 1000);
        const token = JSON.parse(stringToken);
        console.log('now', !stringToken || now > token.expires);
        console.log('token', token);
        if (!stringToken || now > token.expires) {
            setIsAuthenticated(false);
        }
        setIsAuthenticated(true);
    }, [stringToken]);

    return { isAuthenticated };
}
