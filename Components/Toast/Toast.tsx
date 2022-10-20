import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from '../../styles/Components/Toast/toast.module.scss';
import { MaterialIcon } from '../../Utils/Helper';

export interface IToast {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  visible: boolean;
}

const Toast = ({
  toastState,
  setToastState
}: {
  toastState: IToast;
  setToastState: Dispatch<SetStateAction<IToast>>;
}) => {
  const resetToast = () => {
    setToastState({
      message: '',
      type: 'info',
      visible: false
    });
  };

  useEffect(() => {
    if (toastState.visible) {
      setTimeout(() => {
        resetToast();
      }, 5000);
    }
  }, [toastState.visible]);

  const getClassName = () => {
    switch (toastState.type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.info;
    }
  };

  const getIcon = () => {
    switch (toastState.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'exclamation';
      default:
        return 'exclamation';
    }
  };

  return (
    <div
      className={`${styles.container} ${getClassName()} ${
        toastState.visible ? undefined : styles.hide
      }`}
    >
      {MaterialIcon(getIcon())}
      <p>{toastState.message}</p>
      <button onClick={() => toastState.visible && resetToast()}>
        {MaterialIcon('close')}
      </button>
    </div>
  );
};

export default Toast;
