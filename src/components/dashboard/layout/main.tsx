import type { FunctionComponent, PropsWithChildren } from 'react';
import Sidebar from './sidebar';

const Main: FunctionComponent<PropsWithChildren> = ({ children }) => {

    return (
        <main className="flex w-screen h-[calc(100%-144px)] max-h-[calc(100%-144px)]">
            <Sidebar />
            <section className="flex-1 h-full py-5 pl-10 child:pr-20 child:overflow-y-auto child:overflow-x-hidden">
                {children}
            </section>
        </main>
    );
};

export default Main;
