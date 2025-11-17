import React from 'react';
import { type ImgHTMLAttributes, type MouseEventHandler, type ReactElement } from 'react';
import { type MockedFunction } from 'vitest';
import constants from './../../utils/constants.tsx';
import styles from './HeaderManagement.module.css';

export type tHandler = {
    handler: MouseEventHandler<HTMLButtonElement>;
    image: ReactElement<ImgHTMLAttributes<HTMLImageElement>>;
};

interface iHeaderManagement {
    selected: string;
    bgColor: string;
    leftFirstBtn?: tHandler;
    leftSecondBtn?: tHandler;
    leftThirdBtn?: tHandler;
    leftFourthBtn?: tHandler;
    rightFirstBtn?: tHandler;
    rightSecondBtn?: tHandler;
    rightThirdBtn?: tHandler;
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
                            style={{backgroundImage: `url("${leftFirstBtn.image.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftFirstBtn.image.props.alt}`} />
                }

                {leftSecondBtn &&
                    <button onClick={leftSecondBtn.handler}
                            className={styles.leftSecondBtn}
                            id='leftSecondBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${leftSecondBtn.image.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftSecondBtn.image.props.alt}`} />
                }

                {leftThirdBtn &&
                    <button onClick={leftThirdBtn.handler}
                            className={styles.leftThirdBtn}
                            id='leftThirdBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${leftThirdBtn.image.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftThirdBtn.image.props.alt}`} />
                }

                {leftFourthBtn &&
                    <button onClick={leftFourthBtn.handler}
                            className={styles.leftFourthBtn}
                            id='leftFourthBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${leftFourthBtn.image.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${leftFourthBtn.image.props.alt}`} />
                }
            </div>
            <div className={styles.rightActions}>
                {rightFirstBtn &&
                    <button onClick={rightFirstBtn.handler}
                            className={rightFirstBtn ? styles.rightFirstBtn : styles.hide}
                            id='rightFirstBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${rightFirstBtn.image.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${rightFirstBtn.image.props.alt}`} />
                }

                {rightSecondBtn &&
                    <button onClick={rightSecondBtn.handler}
                            className={styles.rightSecondBtn}
                            id='rightSecondBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${rightSecondBtn.image.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${rightSecondBtn.image.props.alt}`} />
                }

                {rightThirdBtn &&
                    <button onClick={rightThirdBtn.handler}
                            className={rightThirdBtn ? styles.rightThirdBtn : styles.hide}
                            id='rightThirdBtn'
                            data-id-item={selected}
                            style={{backgroundImage: `url("${rightThirdBtn.image.props.src}")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '20px 20px'}}
                            aria-label={`${rightThirdBtn.image.props.alt}`} />
                }
            </div>
        </section>
    );
};

export default HeaderManagement;
