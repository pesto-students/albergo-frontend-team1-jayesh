import styles from '../../styles/Components/NavModal/NavModal.module.scss';
import { useAppSelector } from '../../redux/hooks';
import store from '../../redux/store';
import { toggleNavModal } from '../../redux/navModal/modal.slice';
import { MaterialIcon } from '../../Utils/Helper';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { loginForm } from '../../Utils/auth/login';
import { useRouter } from 'next/router';
import Toast, { IToast } from '../Toast/Toast';
import { signupForm } from '../../Utils/auth/signup';

const NavModal = () => {
  const router = useRouter();
  const navModalState = useAppSelector((state) => state.navModal);

  const [loginFormState, setLoginFormState] = useState({
    inpEmail: '',
    inpPassword: ''
  });

  const [formInp, setFormInp] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    country: ''
  });

  const [toastState, setToastState] = useState<IToast>({
    visible: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    if (navModalState.type === 'signup') {

      const getLocationInfo = async () => {
        const ipAddr = await fetch(
          'https://api.ipify.org/?format=json'
        ).then((res) => res.json());

        const location = await fetch(
          `http://ip-api.com/json/${ipAddr?.ip}?fields=573951`
        ).then((res) => res.json());
        return location
      }

      getLocationInfo().then(location => {
        setFormInp((prevFormInp) => ({
          ...prevFormInp,
          country: location?.country,
          state: location?.regionName,
          city: location?.city
        }));
      })
    }
  }, [navModalState.type]);

  if (!navModalState.isNavModalOpen) return null;

  const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = loginFormState.inpEmail;
    const password = loginFormState.inpPassword;
    loginForm({ email, password }, setToastState, router);
  };

  const submitSignupForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupForm(formInp, 'user', setToastState, router);
  };

  const disableSignupBtn = () => {
    if (
      formInp.name &&
      formInp.phone &&
      formInp.password &&
      formInp.confirmPassword &&
      formInp.email
    )
      return false;
    else return true;
  };

  return (
    <Fragment>
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h4>{navModalState.type}</h4>
            <button
              className={`${styles.closeBtn} btn`}
              onClick={() => store.dispatch(toggleNavModal())}
            >
              <MaterialIcon iconName="close" />
            </button>
          </div>
          <div className={styles.modalBody}>
            {navModalState.type === 'login' && (
              <form onSubmit={submitLoginForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={loginFormState.inpEmail}
                    onChange={(e) =>
                      setLoginFormState((prevFormState) => ({
                        ...prevFormState,
                        inpEmail: e.target.value
                      }))
                    }
                    placeholder="Enter your email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={loginFormState.inpPassword}
                    onChange={(e) =>
                      setLoginFormState((prevFormState) => ({
                        ...prevFormState,
                        inpPassword: e.target.value
                      }))
                    }
                    placeholder="Enter your password"
                  />
                </div>
                <Link href="">
                  <a>
                    <p>Forgot password?</p>
                  </a>
                </Link>
                <button
                  className="btn"
                  type="submit"
                  disabled={
                    !loginFormState.inpEmail || !loginFormState.inpPassword
                  }
                >
                  Continue
                </button>
              </form>
            )}
            {navModalState.type === 'signup' && (
              <form onSubmit={submitSignupForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formInp.name}
                    onChange={(e) =>
                      setFormInp((prevFormInp) => ({
                        ...prevFormInp,
                        name: e.target.value
                      }))
                    }
                    required
                    placeholder="Enter name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formInp.phone}
                    onChange={(e) =>
                      setFormInp((prevFormInp) => ({
                        ...prevFormInp,
                        phone: e.target.value
                      }))
                    }
                    required
                    placeholder="Enter phone"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formInp.email}
                    onChange={(e) =>
                      setFormInp((prevFormInp) => ({
                        ...prevFormInp,
                        email: e.target.value
                      }))
                    }
                    required
                    placeholder="Enter email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formInp.password}
                    onChange={(e) =>
                      setFormInp((prevFormInp) => ({
                        ...prevFormInp,
                        password: e.target.value
                      }))
                    }
                    required
                    placeholder="Enter password"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formInp.confirmPassword}
                    onChange={(e) =>
                      setFormInp((prevFormInp) => ({
                        ...prevFormInp,
                        confirmPassword: e.target.value
                      }))
                    }
                    required
                    placeholder="Confirm password"
                  />
                </div>
                <button
                  className="btn"
                  type="submit"
                  disabled={disableSignupBtn()}
                >
                  Continue
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Toast toastState={toastState} setToastState={setToastState} />
    </Fragment>
  );
};

export default NavModal;
