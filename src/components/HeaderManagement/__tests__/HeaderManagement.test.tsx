import React from 'react';
import { type ImgHTMLAttributes, type MouseEventHandler, type MouseEvent, type ReactElement } from 'react';
import { beforeEach, afterEach, describe, expect, test, vi, type MockedFunction } from 'vitest';
import { screen, render } from '@testing-library/react';
import constants from './../../../utils/constants.tsx';
import createUser from './../../../utils/createUser.tsx';
import Cog from './../../../assets/cog.svg';
import HeaderManagement from './../HeaderManagement.tsx';

type tButton = {
    handler: MouseEventHandler<HTMLButtonElement> & { mockClear: () => {} };
    image: ReactElement<ImgHTMLAttributes<HTMLImageElement>>;
};

let user: any;
let rerender: any;
let handlerClick: MouseEventHandler<HTMLButtonElement> & { mockClear: () => {}} = vi.fn((e) => {
//     console.log('HTML BUTTON ELEMENT', e.target);
    const target = e.target as HTMLElement;
//     const id: string | undefined = (e.target as Element).dataset.idItem;
//     return id;
});
let image: ReactElement<ImgHTMLAttributes<HTMLImageElement>> = <img src={Cog} alt='cog' />;
let btn: tButton = {
    handler: handlerClick,
    image: image
};

beforeEach(() => {
    user = createUser();
    handlerClick.mockClear();

    btn = {
        handler: handlerClick,
        image: image
    };

    const renderResult = render(<HeaderManagement selected='1' bgColor={constants.TAN} />);
    rerender = renderResult.rerender;
});

let testedBtn;
const checkBtn = async (purpose: string, handlerClick: MouseEventHandler<HTMLButtonElement> & { mockClear: () => {} }) => {
    testedBtn = (purpose === 'hidden') ? screen.queryByRole('button', { name: 'cog' }) :
                                         screen.getByRole('button', { name: 'cog' });

    if (purpose === 'hidden') {
        expect(testedBtn).toBeNull();
    } else if (purpose === 'show') {
        expect(testedBtn).toBeInTheDocument();
    } else if (purpose === 'click button') {
        await user.click(testedBtn);
        expect(handlerClick).toHaveBeenCalledTimes(1);
    } else if (purpose === 'return value') {
        await user.click(testedBtn);
        expect(handlerClick).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    dataset: expect.objectContaining({
                        idItem: '1'
                    })
                })
            })
       );
    };
};

describe('Header management component', () => {
    test('Header management shown', () => {
        const headerManagement = screen.getByTestId('headerManagement');
        expect(headerManagement).toBeInTheDocument();
    });

    test('Header management displays right color', () => {
        const headerManagement = screen.getByTestId('headerManagement');
        expect(headerManagement).toHaveAttribute(
            'style',
            expect.stringContaining('background-color: rgb(236, 223, 204)')
       );
    });

    // Left First Button
    test('Left first button hidden', () => {
        checkBtn('hidden', btn.handler);
    });

    test('Left first button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFirstBtn={btn}/>);
        checkBtn('show', btn.handler);
    });

    test('Left first button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFirstBtn={btn}/>);
        await checkBtn('click button', btn.handler);
    });

    test('Left first button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFirstBtn={btn} />);
        await checkBtn('return value', btn.handler);
    });

    // Left Second Button
    test('Left second button hidden', () => {
        checkBtn('hidden', btn.handler)
    });

    test('Left second button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftSecondBtn={btn}/>);
        checkBtn('show', btn.handler);
    });

    test('Left second button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftSecondBtn={btn}/>);
        await checkBtn('click button', btn.handler);
    });

    test('Left second button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftSecondBtn={btn}/>);
        await checkBtn('return value', btn.handler);
    });

    // Left Third Button
    test('Left third button hidden', () => {
        checkBtn('hidden', btn.handler)
    });

    test('Left third button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftThirdBtn={btn}/>);
        checkBtn('show', btn.handler);
    });

    test('Left third button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftThirdBtn={btn}/>);
        await checkBtn('click button', btn.handler);
    });

    test('Left third button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftThirdBtn={btn}/>);
        await checkBtn('return value', btn.handler);
    });

    // Left Fourth Button
    test('Left fourth button hidden', () => {
        checkBtn('hidden', btn.handler)
    });

    test('Left fourth button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFourthBtn={btn}/>);
        checkBtn('show', btn.handler);
    });

    test('Left fourth button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFourthBtn={btn}/>);
        await checkBtn('click button', btn.handler);
    });

    test('Left fourth button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} leftFourthBtn={btn}/>);
        await checkBtn('return value', btn.handler);
    });

    // Right First Button
    test('Right first button hidden', () => {
        checkBtn('hidden', btn.handler)
    });

    test('Right first button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightFirstBtn={btn}/>);
        checkBtn('show', btn.handler);
    });

    test('Right first button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightFirstBtn={btn}/>);
        await checkBtn('click button', btn.handler);
    });

    test('Right first button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightFirstBtn={btn}/>);
        await checkBtn('return value', btn.handler);
    });

    // Right Second Button
    test('Right second button hidden', () => {
        checkBtn('hidden', btn.handler)
    });

    test('Right second button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightSecondBtn={btn}/>);
        checkBtn('show', btn.handler);
    });

    test('Right second button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightSecondBtn={btn}/>);
        await checkBtn('click button', btn.handler);
    });

    test('Right second button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightSecondBtn={btn}/>);
        await checkBtn('return value', btn.handler);
    });

    // Right Third Button
    test('Right third button hidden', () => {
        checkBtn('hidden', btn.handler)
    });

    test('Right third button => button shown', () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightThirdBtn={btn}/>);
        checkBtn('show', btn.handler);
    });

    test('Right third button => button clicks', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightThirdBtn={btn}/>);
        await checkBtn('click button', btn.handler);
    });

    test('Right third button => function returns valid selected id (the primary key for the record)', async () => {
        rerender(<HeaderManagement selected='1' bgColor={constants.TAN} rightThirdBtn={btn}/>);
        await checkBtn('return value', btn.handler);
    });
});
