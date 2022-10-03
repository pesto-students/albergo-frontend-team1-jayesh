import Image from 'next/image';
import { useState } from 'react';
import authModalStyles from '../../styles/Components/AuthModal/AuthModal.module.scss';

const AuthModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={authModalStyles.backdrop}>
      <div className={authModalStyles.modalContainer}>
        <div className={authModalStyles.modalHeader}>
          <h5>Login or Signup</h5>
          <button
            className={authModalStyles.closeButton}
            onClick={() => setModalOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <hr />
        <form>
          <div className={authModalStyles.inputContainer}>
            <label htmlFor="inpEmail">email</label>
            <input type="email" id="inpEmail" placeholder="Enter your email" />
          </div>
          <div className={authModalStyles.options}>
            <button type="submit">continue</button>
          </div>
          <div className={authModalStyles.dividerWithText}>
            <hr />
            <small>or continue with</small>
            <hr />
          </div>
          <div className={authModalStyles.altAuthBtnContainer}>
            <button>
              <div className={authModalStyles.icon}>
                <Image
                  src="/assets/icons/fbIcon.png"
                  width={15}
                  height={15}
                  alt="icon"
                />
              </div>
              facebook
            </button>
            <button>
              <div className={authModalStyles.icon}>
                <Image
                  src="/assets/icons/googleIcon.png"
                  width={15}
                  height={15}
                  alt="icon"
                />
              </div>
              google
            </button>
            <button>
              <div className={authModalStyles.icon}>
                <Image
                  src="/assets/icons/appleIcon.png"
                  width={15}
                  height={15}
                  alt="icon"
                />
              </div>
              apple
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
