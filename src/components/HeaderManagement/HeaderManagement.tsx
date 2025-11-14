import React from 'react';
import constants from './../../utils/constants.tsx';
import styles from './HeaderManagement.module.css';

interface iHeaderManagement {
    selected: string
    bgColor: string;
    leftFirstBtn?: {
        handler: () => void | undefined;
        img: React.ReactNode & {
            alt: string | undefined;
        };
    };
    leftSecondBtn?: {
        handler: () => void | undefined;
        img: React.ReactNode & {
            alt: string | undefined;
        };
    };
    leftThirdBtn?: {
        handler: () => void | undefined;
        img: React.ReactNode & {
            alt: string | undefined;
        };
    };
    leftFourthBtn?: {
        handler: () => void | undefined;
        img: React.ReactNode & {
            alt: string | undefined;
        };
    }
    rightFirstBtn?: {
        handler: () => void | undefined;
        img: React.ReactNode & {
            alt: string | undefined;
        };
    }
    rightSecondBtn?: {
        handler: () => void | undefined;
        img: React.ReactNode & {
            alt: string | undefined;
        };
    }
    rightThirdBtn?: {
        handler: () => void | undefined;
        img: React.ReactNode & {
            alt: string | undefined;
        };
    }
};

function HeaderManagement({...headerManagementInputs}: iHeaderManagement) {
    const {
        selected,
        bgColor,
        leftFirstBtn,
        leftSecondBtn,
        leftThirdBtn,
        leftFourthBtn,
        rightFirstBtn,
        rightSecondBtn,
        rightThirdBtn
    } = headerManagementInputs;
    return (
        <section data-testid='headerManagement' className={styles.headerManagement} style={{backgroundColor: bgColor}}>
            <div className={styles.leftActions}>
                {leftFirstBtn &&
                    <button onClick={leftFirstBtn.handler}
                            className={leftFirstBtn ? styles.leftFirstBtn : styles.hide}
                            id='leftFirstBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${leftFirstBtn.img.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftFirstBtn.img.props.alt}`} />
                }

                {leftSecondBtn &&
                    <button onClick={leftSecondBtn.handler}
                            className={styles.leftSecondBtn}
                            id='leftSecondBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${leftSecondBtn.img.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftSecondBtn.img.props.alt}`} />
                }

                {leftThirdBtn &&
                    <button onClick={leftThirdBtn.handler}
                            className={styles.leftThirdBtn}
                            id='leftThirdBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${leftThirdBtn.img.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftThirdBtn.props.img.alt}`} />
                }

                {leftFourthBtn &&
                    <button onClick={leftFourthBtn.handler}
                            className={styles.leftFourthBtn}
                            id='leftFourthBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${leftFourthBtn.img.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftFourthBtn.img.props.alt}`} />
                }
            </div>
            <div className={styles.rightActions}>
                {rightFirstBtn &&
                    <button onClick={rightFirstBtn.handler}
                            className={rightFirstBtn ? styles.rightFirstBtn : styles.hide}
                            id='rightFirstBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${rightFirstBtn.img.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${rightFirstBtn.img.props.alt}`} />
                }

                {rightSecondBtn &&
                    <button onClick={rightSecondBtn.handler}
                            className={styles.rightSecondBtn}
                            id='rightSecondBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${rightSecondBtn.img.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${rightSecondBtn.img.props.alt}`} />
                }

                {rightThirdBtn &&
                    <button onClick={rightThirdBtn.handler}
                            className={rightThirdBtn ? styles.rightThirdBtn : styles.hide}
                            id='rightThirdBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${rightThirdBtn.img.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${rightThirdBtn.img.props.alt}`} />
                }
            </div>
        </section>
    );
};

export default HeaderManagement;
