import { Dispatch, SetStateAction, useEffect } from 'react';
import toastStyles from '../../styles/Components/Toast/toast.module.scss';
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
        return toastStyles.success;
      case 'error':
        return toastStyles.error;
      case 'warning':
        return toastStyles.warning;
      case 'info':
        return toastStyles.info;
      default:
        return toastStyles.info;
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

  console.log(toastState.type, getClassName());

  return (
    <div
      className={`${toastStyles.container} ${getClassName()} ${
        toastState.visible ? undefined : toastStyles.hide
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
