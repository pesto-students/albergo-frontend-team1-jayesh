import { Fragment } from 'react';
import styles from '../../styles/Loading.module.scss';

interface IloadingProps {
    message?: string | null;
}

const Loading = ({ message }: IloadingProps) => {

    return (
        <Fragment>
            <div className={styles.container}>
                {message && (
                    <div className={styles.messageContainer}>
                        <h3>{message}</h3>
                    </div>
                )}
                <div className={styles.content}>
                    <div className={styles.cuboid}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={styles.cuboid}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={styles.cuboid}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={styles.cuboid}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Loading;