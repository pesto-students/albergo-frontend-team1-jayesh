import styles from '../../styles/Components/NavModal/NavModal.module.scss';
import { useAppSelector } from '../../redux/hooks';
import store from '../../redux/store';
import { toggleNavModal } from '../../redux/navModal/modal.slice';
import { MaterialIcon } from '../../Utils/Helper';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { loginForm } from '../../Utils/auth/login';
import { useRouter } from 'next/router';
import { signupForm } from '../../Utils/auth/signup';
import { useSnackbar } from 'notistack';

const NavModal = () => {
  const router = useRouter();
  const navModalState = useAppSelector((state) => state.navModal);

  const [loginFormState, setLoginFormState] = useState({
    inpEmail: 'pestoproject@demomail.com',
    inpPassword: 'Pesto@project123'
  });

  const [signupFormState, setSignupFormState] = useState({
    name: 'Pesto Project',
    phone: '1234567890',
    email: 'pestoproject@demomail.com',
    password: 'Pesto@project123',
    confirmPassword: 'Pesto@project123',
    city: '',
    state: '',
    country: ''
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
        return location;
      };

      getLocationInfo().then(location => {
        setSignupFormState((prevFormInp) => ({
          ...prevFormInp,
          country: location?.country,
          state: location?.regionName,
          city: location?.city
        }));
      });
    }
  }, [navModalState.type]);

  const { enqueueSnackbar } = useSnackbar();

  if (!navModalState.isNavModalOpen) return null;

  const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = loginFormState.inpEmail;
    const password = loginFormState.inpPassword;
    loginForm({ email, password }, enqueueSnackbar, router);
  };

  const submitSignupForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupForm(signupFormState, 'user', enqueueSnackbar);
  };

  const disableSignupBtn = () => {
    if (
      signupFormState.name &&
      signupFormState.phone &&
      signupFormState.password &&
      signupFormState.confirmPassword &&
      signupFormState.email
    )
      return false;
    else return true;
  };

  const closeModal = (e: MouseEvent) => {
    const elTarget = e.target as HTMLElement;
    if (elTarget === document.getElementById("modalBackdrop")) {
      store.dispatch(toggleNavModal());
    }
  };

  return (
    <Fragment>
      <div className={styles.modalBackdrop} id="modalBackdrop" onClick={e => closeModal(e as any)}>
        <div className={styles.modalContainer} id="modalContainer" >
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
                    value={signupFormState.name}
                    onChange={(e) =>
                      setSignupFormState((prevFormInp) => ({
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
                    value={signupFormState.phone}
                    onChange={(e) =>
                      setSignupFormState((prevFormInp) => ({
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
                    value={signupFormState.email}
                    onChange={(e) =>
                      setSignupFormState((prevFormInp) => ({
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
                    value={signupFormState.password}
                    onChange={(e) =>
                      setSignupFormState((prevFormInp) => ({
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
                    value={signupFormState.confirmPassword}
                    onChange={(e) =>
                      setSignupFormState((prevFormInp) => ({
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
    </Fragment>
  );
};

export default NavModal;
