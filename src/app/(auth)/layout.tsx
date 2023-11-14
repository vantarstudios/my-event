import type { FunctionComponent, PropsWithChildren } from 'react';

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <main className={'relative flex justify-center items-top w-screen h-screen py-20 overflow-y-auto'}>
            {children}
        </main>
    );
};

export default AuthLayout;
