import constants from './../../utils/constants.tsx';
import styles from './FormInputTextbox.module.css';

interface iFormInputTextBox {
    ariaLabel: string;
    width: string;
    errors: string[];
};

const FormInputTextBox = ({...formInputTextBoxProps}: iFormInputTextBox) => {
    const {
        ariaLabel,
        width,
        errors
    } = formInputTextBoxProps;
    const inputTextBox =
        <>
            <label htmlFor={ariaLabel}>{ariaLabel}</label>
            <input aria-label={ariaLabel}
                   type='textbox'
                   className={styles.input}
                   style={{width: width,
                           outline: errors.length > 0 ?
                                    'outline: 1px constants.RED' :
                                    'outline: 1px solid rgba(0,0,0,1)' }} />
        </>
    return(inputTextBox);
};

export default FormInputTextBox;