import constants from './../../utils/constants.js';
import styles from './Notify.module.css';

interface iNotify {
    stat: string;
    message: string;
    cb_handlerCloseNotify: () => void;
};

function Notify({ stat, message, cb_handlerCloseNotify }: iNotify) {
    let color: string | undefined;

    switch (stat) {
        case 'success':
            color = constants.GREEN;
            break;
        case 'fail':
            color = constants.RED;
            break;
        case 'warn':
            color = constants.YELLOW;
            break;
        default:
            break;
    };

    return(
        <div data-testid='notify' className={stat ? styles.notify : styles.hide} style={{backgroundColor: color}}>
            <div className={styles.message}>
                {message}
            </div>
            <div className={styles.close}>
                <button onClick={cb_handlerCloseNotify}><strong>X</strong></button>
            </div>
        </div>
    );
};

export default Notify;
