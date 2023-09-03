import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'; // Importa el middleware thunk.
import rootReducer from  '../reducer/index'; // Importa tu reductor principal.

// Crea la tienda Redux utilizando createStore.
export const store = createStore(
    rootReducer, // Usa tu reductor principal.
    composeWithDevTools(applyMiddleware(thunk)) // Habilita middleware con composeWithDevTools.
);