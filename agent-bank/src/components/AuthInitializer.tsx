"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setCredentials } from "../redux/slices/authSlice";
import { loadUser } from "../redux/slices/userSlice";

export default function AuthInitializer() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // Réhydrate l’auth
            dispatch(setCredentials(token));

            // Recharge le profil utilisateur
            dispatch(loadUser(token));
        }
    }, [dispatch]);

    return null; // Ce composant n'affiche rien
}
