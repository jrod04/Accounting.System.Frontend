import { beforeEach, describe, test, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import JournalEntryCard from './../JournalEntryCard.tsx';

let rerender: any, user: any;
let component: HTMLElement;
const handlerSubmit = vi.fn(() => {});
const handlerCancel = vi.fn(() => {});

describe('JournalEntryCard component', () => {
    beforeEach(() => {
        handlerSubmit.mockClear();
        handlerCancel.mockClear();
        user = createUser();
        const renderResult = render(<JournalEntryCard width={200}
                                                      dropdownValues={[]}
                                                      cb_handlerSubmit={handlerSubmit}
                                                      cb_handlerCancel={handlerCancel} />);
        component = screen.getByRole('region', { name: 'Journal Entry Card' });
        rerender = renderResult.rerender;
    });

    test('Cmp displays', () => {
        expect(component).toBeInTheDocument();
    });

    test('Title displays', () => {
        const title = component.children[0]?.textContent;
        expect(title).toBe('Journal Entry');
    });

    test('Date displays and blank', () => {
        const date = (component.children[1]?.children[0] as HTMLInputElement)?.value;
        expect(date).toBe('');
    });

    test('Search button icon displays', () => {
        const icon = screen.getByRole('button', { name: 'Search Accounts Icon' });
        expect(icon).toBeInTheDocument();
    });

    test('Account search textbox displays with Search for account...', () => {
        const accountSearch: HTMLInputElement = screen.getByRole('textbox', { name: 'Account Search Textbox' });
        expect(accountSearch.value).toBe('Search for account...');
    });

    test('Amount entry textbox displays and blank', () => {
        const amountEntry: HTMLInputElement = screen.getByRole('textbox', { name: 'Amount Entry Textbox' });
        expect(amountEntry.value).toBe('');
    });

    test('Debit button clicks and displays the correct account and amount', async () => {
        const accountSearchBox = screen.getByRole('textbox', { name: 'Account Search Textbox' });
        await user.type(accountSearchBox, '1000 - Business Checking');
        const amountEntryBox = screen.getByRole('textbox', { name: 'Amount Entry Textbox' });
        await user.type(amountEntryBox, '5');
        const button = screen.getByRole('button', { name: 'Debit Entry Button' });
        await user.click(button);

        const text = screen.getByText('1000 - Business Checking');
        expect(text).toBeInTheDocument();
    });

    test('Debit button clicks with missing/non-existent account and displays error', async () => {
        const accountSearchBox = screen.getByRole('textbox', { name: 'Account Search Textbox' });
        await user.type(accountSearchBox, 'a');
        const amountEntryBox = screen.getByRole('textbox', { name: 'Amount Entry Textbox' });
        await user.type(amountEntryBox, '5');
        const button = screen.getByRole('button', { name: 'Debit Entry Button' });
        await user.click(button);

        const text = screen.getByText('Account does not exist.');
        expect(text).toBeInTheDocument();
    });

    test('Debit button clicks with missing/invalid entry amount and displays error', () => {

    });

    test('Debit total shows red if debit/credit imbalance exists', () => {

    });

    test('Credit button clicks and displays the correct account and amount', () => {

    });

    test('Credit button clicks with missing/non-existent account and displays error', () => {

    });

    test('Credit total shows red if debit/credit imbalance exists', () => {

    });

    test('Attachment displays file selected', () => {

    });

    test('Cancel button calls', () => {

    });

    test('Submit button calls', () => {

    });
});