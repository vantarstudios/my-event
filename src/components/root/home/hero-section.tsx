import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { OverlappingImages } from '@components/root';
import { Button } from '@components/ui/buttons';

const HeroSection: FunctionComponent = () => {
    return (
        <section className="relative flex flex-col-reverse lg:flex-row gap-5 lg:gap-0 w-full">
            <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-7 w-full lg:w-1/2">
                <p className="text-center lg:text-start text-xl md:text-5xl xl:text-8xl font-bold">
                    <span className="text-2xl md:text-6xl xl:text-10xl text-primary">MyEvent:</span>
                    &nbsp;
                    the most powerful management tool for your events.
                </p>
                <p className="text-center lg:text-start text-base leading-[2.5vh] lg:leading-[3.5vh]">
                    Create, organize and manage your events with your team. Plan how every task and activities will be
                    done and by who before, during and after your events. Use social medias and the eventMedia app to
                    promote and boost your events easily.
                </p>
                <Link href="/dashboard" className="w-fit focus:outline-none">
                    <Button className="px-10 py-4 md:px-16 rounded-full lg:h-14 lg:text-lg font-normal hover:bg-primary">Get Started</Button>
                </Link>
            </div>
            <OverlappingImages/>
        </section>
    );
};

export default HeroSection;
