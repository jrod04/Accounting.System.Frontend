import userEventDefault from '@testing-library/user-event';
import { type UserEvent } from '@testing-library/user-event'

const createUser = (): UserEvent => {
    const userEvent: any = userEventDefault as unknown as (typeof userEventDefault)['default'];
    return userEvent.setup();
};

export default createUser;
