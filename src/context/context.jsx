import React from "react";
import { initialState, AppReducer } from "./reducer";
 
const AppStateContext = React.createContext('');
const AppDispatchContext = React.createContext('');

export const useAppState = () =>  React.useContext(AppStateContext)
export const useAppDispatch = () => React.useContext(AppDispatchContext)

export const AppProvider = ({ children }) => {
	const [user, dispatch] = React.useReducer(AppReducer, initialState);

	return (
		<AppStateContext.Provider value={user}>
			<AppDispatchContext.Provider value={dispatch}>
				{children}
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	);
};