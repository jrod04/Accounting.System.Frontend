import { beforeEach, describe, test, expect, vi } from 'vitest';
import { screen, render} from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import constants from './../../../utils/constants.tsx';
import InputTextbox from './../InputTextbox.tsx';

describe('Input textbox component without errors', () => {
    beforeEach(() => {
        render(<InputTextbox ariaLabel='Name' width={100} direction='column' errors='' />);
    });

    test('Input textbox displays => get by ariaLabel -Name-', () => {
        const inputTextbox: HTMLInputElement = screen.getByRole('textbox', { name: 'Name' });
        expect(inputTextbox).toBeInTheDocument();
    });

    test('Input container displays with correct width', () => {
        const inputOuterContainer = screen.getByTestId('inputOuterContainer');
        expect(inputOuterContainer).toHaveStyle({width: '100px'});
    });

    test('Input textbox has column direction attribute', () => {
        const inputInnerContainer = screen.getByTestId('inputInnerContainer');
        expect(inputInnerContainer).toHaveStyle({flexDirection: 'column'});
    });

    test('Input textbox does not display errors when errors are not present', () => {
        const errorContainer = screen.getByTestId('errorContainer');
        expect(errorContainer.textContent).toBe('');
    });

    test('Input textbox displays what the user types', async () => {
        const user = createUser();
        const inputTextbox: HTMLInputElement = screen.getByRole('textbox', { name: 'Name' });
        await user.type(inputTextbox, 'User types');
        expect(inputTextbox.value).toEqual('User types');
    });
})

describe('Input textbox component with errors', () => {
    beforeEach(() => {
        render(<InputTextbox ariaLabel='Name' width={100} direction='row' errors='I found an error.' />);
    });


    test('Input textbox has row direction attribute', () => {
        const inputInnerContainer = screen.getByTestId('inputInnerContainer');
        expect(inputInnerContainer).toHaveStyle({flexDirection: 'row'});
    });

    test('Input textbox displays errors when errors are present', () => {
        const error = screen.getByText('I found an error.');
        expect(error).toBeInTheDocument();
    });

    test('Input textbox border is red when errors are present', () => {
        const inputTextbox: HTMLInputElement = screen.getByRole('textbox', { name: 'Name' });
        expect(inputTextbox).toHaveStyle({border: `1.5px solid ${constants.RED};`});
    });

    test('Input textbox outline is red onFocus when errors are present', async () => {
        const user = createUser();
        const inputTextbox: HTMLInputElement = screen.getByRole('textbox', { name: 'Name' });
        await user.click(inputTextbox);
        expect(inputTextbox).toHaveStyle({outline: `1.5px solid ${constants.RED}`});
    });
});