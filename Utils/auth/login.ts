import { NextRouter } from 'next/router';
import { toggleNavModal } from '../../redux/navModal/modal.slice';
import store from '../../redux/store';
import { setUserEncryptedToken } from '../../redux/user/user.slice';
import { handleResponse, makeReq } from '../db';
import { SnackbarType } from '../Helper';
import { setTokenCookie } from './authHelper';

interface ILoginFormObj {
	email: string;
	password: string;
}

const loginForm = async (
	formObj: ILoginFormObj,
	enqueueSnackbar: SnackbarType,
	router: NextRouter
) => {

	const resObj = await makeReq('/api/auth/login', 'POST', formObj);

	const res = handleResponse(resObj, enqueueSnackbar);

	if (res) {
		const token = res?.token;
		setTokenCookie(token);
		store.dispatch(setUserEncryptedToken(token));
		enqueueSnackbar("Signup successful", {
			variant: "success"
		});
		store.dispatch(toggleNavModal());
		router.push('/');
		return;
	}

	return;
};

export { loginForm };
