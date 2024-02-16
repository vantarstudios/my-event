import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { PrimaryButton } from '@components/ui/buttons';

const FreeSection: FunctionComponent = () => {
    return (
        <section className="relative flex flex-col items-center gap-5 lg:gap-10 w-full">
            <p className="text-3xl lg:text-5xl text-primary font-bold">
                Everything&ensp;is&ensp;free
            </p>
            <p className="text-base leading-[2.5vh] lg:leading-[3.5vh] w-full lg:w-1/2 text-center">
                We believe crafting and organizing a memorable event should be made easy and without stress. That’s the
                reason we made it free for you. Go and start organizing the next event of the year.
            </p>
            <Link href="/dashboard" className="w-fit focus:outline-none">
                <PrimaryButton className="px-10 py-4 md:px-16 rounded-full lg:text-lg font-normal">Get Started</PrimaryButton>
            </Link>
        </section>
    );
};

export default FreeSection;
