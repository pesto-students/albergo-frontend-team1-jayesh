import { setNavModalType } from '../../redux/navModal/modal.slice';
import store from '../../redux/store';
import { handleResponse, makeReq } from '../db';
import { SnackbarType, UserRole } from '../Helper';

export interface IUserSignupForm {
	name: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
	city: string;
	state: string;
	country: string;
}

export interface IPartnerSignupForm {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone: string;
	address: string;
	lat: number;
	long: number;
	city: string;
	state: string;
	country: string;
}

const signupForm = async (
	formObj: IPartnerSignupForm | IUserSignupForm,
	role: UserRole,
	enqueueSnackbar: SnackbarType
) => {

	const resObj = await makeReq('/api/auth/signup', "POST", { ...formObj, role });

	console.log(resObj);

	const res = handleResponse(resObj, enqueueSnackbar);

	if (res) {
		enqueueSnackbar("Signup successful", {
			variant: "success"
		});
		store.dispatch(setNavModalType("login"));
		return;
	}

	return;
};

export { signupForm };
