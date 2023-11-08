import type { FunctionComponent, PropsWithChildren } from 'react';

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <main className={'flex justify-center py-20'}>{children}</main>;
};

export default AuthLayout;
