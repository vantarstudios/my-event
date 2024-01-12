'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

const StoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default StoreProvider;
