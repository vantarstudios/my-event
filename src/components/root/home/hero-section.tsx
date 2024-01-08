import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { OverlappingImages } from '@components/root';
import { Button } from '@components/ui/buttons';

const HeroSection: FunctionComponent = () => {
    return (
        <section className="relative flex gap-[10vh] w-full">
            <div className="flex flex-col gap-[5vh] w-1/2">
                <p className="text-10xl font-bold">
                    <span className="text-10xl text-primary">MyEvent:</span>
                    &nbsp;
                    the most powerful management tool for your events.
                </p>
                <p>
                    Create, organize and manage your events with your team. Plan how every task and activities will be
                    done and by who before, during and after your events. Use social medias and the eventMedia app to
                    promote and boost your events easily.
                </p>
                <Link href="/dashboard" className="w-fit focus:outline-none">
                    <Button className="px-[8vh] text-lg font-normal hover:bg-primary">Get Started</Button>
                </Link>
            </div>
            <OverlappingImages/>
        </section>
    );
};

export default HeroSection;
