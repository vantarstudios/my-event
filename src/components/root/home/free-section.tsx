import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/buttons';

const FreeSection: FunctionComponent = () => {
    return (
        <section className="relative flex flex-col items-center gap-[5vh] w-full">
            <p className="text-5xl text-primary font-bold">
                Everything&ensp;is&ensp;free
            </p>
            <p className="text-lg w-1/2 text-center">
                We believe crafting and organizing a memorable event should be made easy and without stress. That’s the
                reason we made it free for you. Go and start organizing the next event of the year.
            </p>
            <Link href="/dashboard" className="w-fit focus:outline-none">
                <Button className="px-[8vh] text-lg font-normal hover:bg-primary">Get Started</Button>
            </Link>
        </section>
    );
};

export default FreeSection;
