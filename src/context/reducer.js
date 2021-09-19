import { Map } from 'immutable';
import AuthSession from '../utils/helpers/authSession';

export const initialState = Map({
	isAuth: !!AuthSession.getIsAuthSession(),
	user: AuthSession.getUser(),
	channel: {},
	messages: []
});

export const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			state = state.set('user', action.payload);
			state = state.set('isAuth', true);
			return state;
		case 'LOGOUT':
			state = state.set('isAuth', false);
			state = state.set('user', null);
			state = state.set('channel', {});
			state = state.set('messages', []);
			return state;
		case 'CHANGE_USER':
			state = state.set('user', action.payload);
			return state;
		case 'SET_CHENNEL':
			state = state.set('channel', action.payload);
			return state;
		case 'SET_MESSAGES':
			state = state.update('messages', (messages) => messages.concat(action.payload));
			return state;
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};