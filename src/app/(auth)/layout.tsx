import React from 'react';

function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return <main className={'flex justify-center py-20'}>{children}</main>;
}

export default Layout;
