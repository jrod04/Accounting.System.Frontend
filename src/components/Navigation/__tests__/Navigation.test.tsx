import React from 'react';
import { beforeEach, afterEach, describe, test, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import createUser from './../../../utils/createUser.tsx';
import Navigation from './../Navigation.tsx';

let user = createUser();
interface iEvents {
    [key: string]: any;
};
let events: iEvents = {};


describe('Navigation component', () => {
    beforeEach(() => {
        user = createUser();
        events = {};
        vi.restoreAllMocks();
        // vi.spyOn intercepts the 'addEventListener' attachment to window in the tested Component and adds its functions to events object
        // the effect is that the event listeners don't execute until you action them from the new events object
        vi.spyOn(window, 'addEventListener').mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => events[type] = listener);
        vi.spyOn(window, 'removeEventListener').mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => delete events[type]);
    });

    test('Navigation title shown', () => {
        render(<Navigation title='Navigation Bar' />);
        const nav: HTMLElement = screen.getByRole('navigation');
        expect(nav).toHaveTextContent('Navigation Bar');
    });

    test('Init settingsContainer is hidden', () => {
        render(<Navigation title='Navigation Bar' />);
        const settingsContainer: HTMLElement | null = screen.queryByTestId(new RegExp('.*settingsContainer.*', 'i'));
        expect(settingsContainer).toBeNull();
    });

    test('Click Settings to show settingsContainer and then click again to hide it', async () => {
        render(<Navigation title='Navigation Bar' />);
        const user = createUser();
        const settings: HTMLButtonElement = screen.getByRole('button', { name: 'Settings Button' });

        // Show
        await user.click(settings);
        expect(await screen.findByTestId('settingsContainer'));

        // Hide
        await user.click(settings);
        const settingsContainer: HTMLElement | null = await screen.queryByTestId('settingsContainer')
        expect(settingsContainer).toBeNull();
    });

    test('Click Settings to show settingsContainer and then click the window to hide', async () => {
        const user = createUser();
        render(<Navigation title='Navigation Bar' />);
        const settings: HTMLButtonElement = screen.getByRole('button', { name: 'Settings Button' } );

            // Show
            await user.click(settings);
            expect(await screen.findByTestId('settingsContainer'));

            // Hide
            if (events.click) {
                const title: HTMLElement = screen.getByTestId('title');
                await act(() => {
                    events.click(title);
                });
                const settingsContainer: HTMLElement | null = await screen.queryByTestId('settingsContainer');
                expect(settingsContainer).toBeNull();
            };
    });
});
