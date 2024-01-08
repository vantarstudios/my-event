import type { NextPage } from 'next';
import Link from 'next/link';
import { PageContainer, OverlappingImages } from '@components/root';
import { Button } from '@components/ui/buttons';
import { SectionDivider } from '@components/ui/layouts';

const DiscoverPage: NextPage = () => {
    return (
        <PageContainer>
            <section className="relative flex gap-[15vh] w-full">
                <div className="flex flex-col gap-[5vh] w-1/2">
                    <p className="text-9xl leading-[10vh] font-bold">
                        We made it free and accessible as possible for you to create events
                    </p>
                    <p>
                        Whether you are an organization or an individual, we got you! Our customized plans will suits
                        your need to the fullest and if it don’t, we’re more than glad to get in touch to provide you
                        the best experience possible.
                    </p>
                    <Link href="/dashboard" className="w-fit focus:outline-none">
                        <Button className="px-[8vh] text-lg font-normal hover:bg-primary">Get Started</Button>
                    </Link>
                </div>
                <OverlappingImages/>
            </section>
            <SectionDivider/>
            <section className="relative flex flex-col items-center gap-[5vh] w-full">
                <p className="text-5xl text-primary font-bold">
                    Try workspaces
                </p>
                <p className="text-lg w-1/2 text-center">
                    From creation to team management and social medias presence, your workspace is equipped with all the
                    necessary tools to easily control every step of your event.
                </p>
                <Link href="/contact-us" className="w-fit focus:outline-none">
                    <Button className="px-[8vh] text-lg text-black font-medium border-2 border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white">
                        Request demo
                    </Button>
                </Link>
            </section>
        </PageContainer>
    )
};

export default DiscoverPage;
