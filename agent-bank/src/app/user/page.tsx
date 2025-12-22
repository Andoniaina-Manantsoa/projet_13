"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Account from "../../components/Account";
import { accounts } from "../../data/mockAccount";
import { AppDispatch, RootState } from "../../redux/store";
import { loadUser, updateUser } from "../../redux/slices/userSlice";

/**
 * Page profil utilisateur
 */
export default function User() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // -------------------
    // États Redux
    // -------------------
    const { firstName: reduxFirstName, lastName: reduxLastName } = useSelector((state: RootState) => state.user);

    // -------------------
    // États locaux pour l'édition
    // -------------------
    const [isEditing, setIsEditing] = useState(false); // Mode édition activé ou non
    const [editFirstName, setEditFirstName] = useState(""); // Prénom modifiable
    const [editLastName, setEditLastName] = useState(""); // Nom modifiable

    // -------------------
    // Protection de la page (authentification)
    // -------------------
    useEffect(() => {

        // Récupération du token stocké
        const token = localStorage.getItem("token");

        // Si pas de token → redirection login
        if (!token) {
            router.push("/sign-in");
            return;
        }

        // Charge les données via Redux si elles ne sont pas déjà là (ou pour rafraîchir)
        dispatch(loadUser(token));

    }, [router, dispatch]);

    // Initialise les champs d'édition quand les données Redux changent
    useEffect(() => {
        if (reduxFirstName) setEditFirstName(reduxFirstName);
        if (reduxLastName) setEditLastName(reduxLastName);
    }, [reduxFirstName, reduxLastName]);

    // -------------------
    // Sauvegarde des modifications du profil
    // -------------------
    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            // Appel Action Redux pour mettre à jour le profil
            await dispatch(updateUser({ token, firstName: editFirstName, lastName: editLastName })).unwrap();

            // Sortie du mode édition
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    // -------------------
    // Annulation de l’édition
    // -------------------
    const handleCancel = () => {
        // Réinitialisation avec les valeurs Redux
        if (reduxFirstName) setEditFirstName(reduxFirstName);
        if (reduxLastName) setEditLastName(reduxLastName);
        setIsEditing(false);
    };

    // -------------------
    // Rendu principal
    // -------------------
    return (
        <>
            {/* Nav n'a plus besoin de props manuelles */}
            <Nav />

            <main className="flex-1 bg-[#1a0b2e]">
                <div className="bg-light py-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Welcome back
                        </h1>

                        {isEditing ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={editFirstName}
                                        onChange={(e) => setEditFirstName(e.target.value)}
                                        className="border border-gray-500 px-2 py-2 text-s bg-white"
                                        placeholder="Tony"
                                    />
                                    <input
                                        type="text"
                                        value={editLastName}
                                        onChange={(e) => setEditLastName(e.target.value)}
                                        className="border border-gray-500 px-4 py-2 text-s bg-white"
                                        placeholder="Stark"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSave}
                                        className="border border-green-600 bg-white text-green-600 font-bold px-6 py-2 hover:bg-green-600 hover:text-white transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="border border-green-600 bg-white text-green-600 font-bold px-6 py-2 hover:bg-green-600 hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-white text-4xl mb-8">
                                    {reduxFirstName} {reduxLastName}
                                </p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className=" text-white bg-green-600 font-bold px-4 py-2 hover:bg-primary-dark transition"
                                >
                                    Edit Name
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <h2 className="sr-only">Accounts</h2>

                {accounts.map((account, index) => (
                    <Account
                        key={index}
                        title={account.title}
                        amount={account.amount}
                        description={account.description}
                        accountId={account.id}
                    />
                ))}
            </main>

            <Footer />
        </>
    );
}