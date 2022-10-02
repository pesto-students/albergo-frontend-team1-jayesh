import { AUTH_MODAL_OFF, AUTH_MODAL_ON } from '../actions/authModal.actions';
import { AuthModalActions, AuthModalState } from '../types/authModal.type';

export const authModalState: AuthModalState = {
  isOpen: false
};

export const authModalReducer = (
  state = authModalState,
  action: AuthModalActions
): AuthModalState => {
  switch (action.type) {
    case AUTH_MODAL_ON:
      return {
        ...state,
        isOpen: true
      };
    case AUTH_MODAL_OFF:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};
