// Import des hooks de base de react-redux pour accéder au store
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Import des types du store créé (RootState pour le state global, AppDispatch pour le dispatch typé)
import type { RootState, AppDispatch } from './store';

// Hook typé pour le dispatch
// Permet d'utiliser `dispatch` dans les composants avec la connaissance des types des actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook typé pour le selector
// Permet d'utiliser `useSelector` avec le type exact de RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
