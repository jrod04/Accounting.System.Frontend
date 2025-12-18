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

    test('Cmp displays displays', () => {
        expect(component).toBeInTheDocument();
    });

    test('Title present', () => {
        const title = component.children[0]?.textContent;
        expect(title).toBe('Journal Entry');
    });

    test('Date to be present and blank', () => {
        const date = (component.children[1]?.children[0] as HTMLInputElement)?.value;
        expect(date).toBe('');
    });

    test('', () => {

    });

    test('', () => {

    });

    test('', () => {

    });

    test('', () => {

    });

    test('', () => {

    });


});