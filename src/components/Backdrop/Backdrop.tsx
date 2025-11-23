import { type PropsWithChildren } from 'react';
import styles from './Backdrop.module.css';

interface iBackdrop {
    backdrop: boolean;
    loader: boolean;
};

const Backdrop = ({backdrop, loader, children}: PropsWithChildren<iBackdrop>) => {
    return(
        <>
            {backdrop &&
                <div data-testid='backdrop'
                     className={!loader ? styles.wrapperBackdrop : styles.wrapperLoader}>
                        <div className={!loader ? styles.backdrop : styles.hide} />
                        <div data-testid='loader' className={loader ? styles.loader : styles.hide}>
                            {children}
                        </div>
                </div>
            }
            {!backdrop &&
                <div className={styles.children}>
                    {children}
                </div>
            }
        </>
    );
};

export default Backdrop;
