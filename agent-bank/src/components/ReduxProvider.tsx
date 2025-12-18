"use client";

// Composant Provider de React Redux
// Il permet de rendre le store accessible à tous les composants enfants
import { Provider } from "react-redux";

// Import du store Redux central de l’application
import { store } from "../redux/store";

// Type React pour typer les enfants du composant
import { ReactNode } from "react";

/**
 * Composant ReduxProvider
 * Englobe l’application afin de fournir le store Redux
 * à l’ensemble des composants
 */
export default function ReduxProvider({ children }: { children: ReactNode }) {
    return (
        // Provider Redux : rend le store accessible via useSelector / useDispatch
        <Provider store={store}>
            {children}
        </Provider>
    );
}

