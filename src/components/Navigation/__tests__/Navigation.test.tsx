import React from 'react';
import { beforeEach, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import createUser from './../../../utils/createUser.tsx';
import Navigation from './../Navigation.tsx';

let user = createUser();

describe('Navigation component', () => {
    beforeEach(() => {
        user = createUser();
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
        const settings = screen.getByRole('button', { name: 'Settings Button' });

        // Show
        await user.click(settings);
        screen.debug();
//         expect(await screen.findByTestId('settingsContainer'));

        // Show
//         await user.click(settings);

//         await waitFor(() => {
//             expect(screen.getByTestId('settingsContainer').outerHTML).toMatch(new RegExp('.*Settings Placeholder.*', 'i'));
//         });

        // Hide
//         await user.click(settings);
//         await waitFor(() => {
//             const settingsContainer = screen.queryByText(/.*Settings PlaceHolder.*/i);
//             expect(settingsContainer).not.toBeInTheDocument();
//         });
    });

    test('Click Settings to show settingsContainer and then click the window to hide', async () => {
//         const user: any = createUser();
//         render(<Navigation title='Navigation Bar' />);
//         const settings: HTMLButtonElement = screen.getByRole('button', { name: 'Settings Button' } );

//         if (settings) {
//             // Show
//             await user.click(settings);
//             await waitFor(() => {
//                 expect(screen.getByTestId('settingsContainer').outerHTML).toMatch(new RegExp('.*Settings Placeholder.*', 'i'));
//             });
//
//             // Hide
//             const w = window.addEventListener('click', function(e: Event) {});
//             await user.click(w);
//             await waitFor(() => {
//                const settingsContainer = screen.queryByText(/.*Settings Placeholder.*/i);
//                expect(settingsContainer).toBeNull();
//             });
//         };
    });

});