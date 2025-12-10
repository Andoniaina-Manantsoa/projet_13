"use client";

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useEffect } from 'react';
import { setCredentials } from '../store/slices/authSlice';

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Restaurer le token au chargement de l'application
        const token = localStorage.getItem('token');
        if (token) {
            store.dispatch(setCredentials(token));
        }
    }, []);

    return <Provider store={store}>{children}</Provider>;
}