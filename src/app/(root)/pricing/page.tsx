import type { NextPage } from 'next';
import Link from 'next/link';
import { PageContainer, OverlappingImages, SectionDivider } from '@components/root';
import { Button } from '@components/ui/buttons';

const PricingPage: NextPage = () => {
    return (
        <PageContainer>
            <section className="relative flex flex-col-reverse lg:flex-row gap-10 md:gap-14 lg:gap-28 w-full">
                <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-7 w-full lg:w-1/2">
                    <p className="text-center lg:text-start text-4xl md:text-5xl xl:text-6xl font-bold">
                        We made it free and accessible as possible for you to create events
                    </p>
                    <p className="text-center lg:text-start lg:leading-[3.5vh]">
                        Whether you are an organization or an individual, we got you! Our customized plans will suits
                        your need to the fullest and if it don’t, we’re more than glad to get in touch to provide you
                        the best experience possible.
                    </p>
                    <Link href="/dashboard" className="w-fit focus:outline-none">
                        <Button className="px-10 py-4 md:px-16 rounded-full lg:text-lg font-normal hover:bg-primary">Get Started</Button>
                    </Link>
                </div>
                <OverlappingImages/>
            </section>
            <SectionDivider className="lg:mt-28"/>
            <section className="relative flex flex-col items-center gap-5 lg:gap-10 w-full">
                <p className="text-3xl lg:text-5xl text-primary font-bold">
                    Try workspaces
                </p>
                <p className="text-base lg:text-lg lg:leading-[3.5vh] w-full lg:w-1/2 text-center">
                    From creation to team management and social medias presence, your workspace is equipped with all the
                    necessary tools to easily control every step of your event.
                </p>
                <Link href="/contact-us" className="w-fit focus:outline-none">
                    <Button className="px-10 py-4 md:px-16 rounded-full lg:text-lg text-black font-medium border-2 border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white">
                        Request demo
                    </Button>
                </Link>
            </section>
        </PageContainer>
    )
};

export default PricingPage;
