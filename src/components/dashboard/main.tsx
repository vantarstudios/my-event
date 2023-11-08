'use client';

import { useState } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import Menu from './menu';

const Main: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [activeViewIndex, setActiveViewIndex] = useState<number>(0);

    return (
        <main className="flex w-screen h-full">
            <Menu
                activeViewIndex={activeViewIndex}
                setActiveViewIndex={setActiveViewIndex}
            />
            <section className="">{children}</section>
        </main>
    );
};

export default Main;
