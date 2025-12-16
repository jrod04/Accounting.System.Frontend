import { type ChangeEvent, type MouseEvent } from 'react';
import { beforeEach, describe, test, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import InputSearchTextbox from './../InputSearchTextbox.tsx';

let rerender: any, user: any;
const cb_handlerOnChange = vi.fn((e: ChangeEvent<HTMLInputElement>) => {});
const cb_handlerOnFocus = vi.fn((e: ChangeEvent<HTMLInputElement>) => {});
const cb_handlerOnBlur = vi.fn((e: ChangeEvent<HTMLInputElement>) => {});
const cb_handlerSetSearchValue = vi.fn((searchValue: string) => {});

beforeEach(() => {
    user = createUser();
    cb_handlerOnChange.mockClear();
    cb_handlerOnFocus.mockClear();
    cb_handlerOnBlur.mockClear();
    cb_handlerSetSearchValue.mockClear();
    const renderResult = render(<InputSearchTextbox ariaLabel='Chart of Accounts Search Button'
                                                    errors=''
                                                    textboxWidth={200}
                                                    textboxHeight={15}
                                                    iconWidth={25}
                                                    iconHeight={25}
                                                    showImage={true}
                                                    searchValue='Search...'
                                                    cb_handlerOnChange={cb_handlerOnChange}
                                                    cb_handlerOnFocus={cb_handlerOnFocus}
                                                    cb_handlerOnBlur={cb_handlerOnBlur}
                                                    cb_handlerSetSearchValue={cb_handlerSetSearchValue} />);
    rerender = renderResult.rerender;
});

describe('Input search textbox component', () => {
    test('Input search textbox component container displays', () => {
        const container = screen.getByTestId('Search container');
        expect(container).toBeInTheDocument();
    });

    test('Input search textbox displays', () => {
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button'});
        expect(searchBox).toBeInTheDocument();
    });

    test('Input search textbox has correct width', () => {
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button'});
        expect(searchBox).toHaveStyle('width: 200px');
    });

    test('Input search textbox has correct height', () => {
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button'});
        expect(searchBox).toHaveStyle('height: 15px');
    });

    test('Icon has correct width', () => {
        const icon = screen.getByRole('img', { name: 'Search Button Icon'});
        expect(icon).toHaveStyle('width: 25px');
    });

    test('Icon has correct height', () => {
        const icon = screen.getByRole('img', { name: 'Search Button Icon'});
        expect(icon).toHaveStyle('height: 25px');
    });

    test('No image shown if showImage=false', () => {
        rerender(<InputSearchTextbox ariaLabel='Chart of Accounts Search Button'
                                     errors=''
                                     textboxWidth={200}
                                     textboxHeight={15}
                                     iconWidth={25}
                                     iconHeight={25}
                                     searchValue='Search...'
                                     showImage={false}
                                     cb_handlerOnChange={cb_handlerOnChange}
                                     cb_handlerOnFocus={cb_handlerOnFocus}
                                     cb_handlerOnBlur={cb_handlerOnBlur}
                                     cb_handlerSetSearchValue={cb_handlerSetSearchValue} />);
        const icon = screen.queryByRole('img', { name: 'Search Button Icon'});
        expect(icon).toBeNull();
    });

    test('Image shown to the right of the textbox if showImage=true', () => {
        const inputInnerContainer = screen.getByTestId('Search container');
        const inputElement = inputInnerContainer.children[0]?.children[0]?.children[0]?.children[0];
        expect(inputElement?.tagName).toBe('INPUT');
    });

    test('Input textbox color gray when searchValue === Search...', () => {
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button'});
        expect(searchBox).toHaveStyle('color: rgba(0,0,0,0.2)');
    });

    test('Input textbox color black when searchValue !== Search...', () => {
        rerender(<InputSearchTextbox ariaLabel='Chart of Accounts Search Button'
                                     errors=''
                                     textboxWidth={200}
                                     textboxHeight={15}
                                     iconWidth={25}
                                     iconHeight={25}
                                     searchValue='Data'
                                     showImage={false}
                                     cb_handlerOnChange={cb_handlerOnChange}
                                     cb_handlerOnFocus={cb_handlerOnFocus}
                                     cb_handlerOnBlur={cb_handlerOnBlur}
                                     cb_handlerSetSearchValue={cb_handlerSetSearchValue} />);
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button'});
        expect(searchBox).toHaveStyle('color: rgba(0,0,0,1)');
    });

    test('Component ref present and works', () => {

    });

    test('cb_handlerOnChange clicks and returns ChangeEvent<HTMLInputElement>', async () => {
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button' });
        await user.type(searchBox, 'Data');
        expect(cb_handlerOnChange).toHaveBeenCalledTimes(4);
        const eventArg = cb_handlerOnChange?.mock.calls[0]?.[0] ?? undefined;
        expect(eventArg?.target).toBe(searchBox);
    });

    test('cb_handlerOnFocus clicks and returns ChangeEvent<HTMLInputElement>', async () => {
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button' });
        await user.click(searchBox);
        expect(cb_handlerOnFocus).toHaveBeenCalledTimes(1);
        const eventArg = cb_handlerOnFocus?.mock.calls[0]?.[0] ?? undefined;
        expect(eventArg?.target).toBe(searchBox);
    });

    test('cb_handlerOnBlur clicks and returns ChangeEvent<HTMLInputElement>', async () => {
        const searchBox = screen.getByRole('textbox', { name: 'Chart of Accounts Search Button' });
        const img = screen.getByRole('img', { name: 'Search Button Icon'});
        await user.click(searchBox);
        await user.click(img);
        expect(cb_handlerOnBlur).toHaveBeenCalledTimes(1);
        const eventArg = cb_handlerOnBlur?.mock.calls[0]?.[0] ?? undefined;
        expect(eventArg?.target).toBe(searchBox);

    });
});