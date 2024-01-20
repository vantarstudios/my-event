import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/buttons';
import AppsImages from './apps-images';

const AppsIntegrationSection: FunctionComponent = () => {
    return (
        <section className="flex justify-between w-full">
            <div className="flex flex-col items-center md:items-start gap-5 md:gap-7 w-full md:w-1/2 md:py-10">
                <p className="text-center md:text-start text-2xl md:text-5xl text-primary font-bold">
                    Integrate your favorite apps to make improve your workspace experience.
                </p>
                <p className="text-center md:text-start text-base md:text-lg leading-[2.5vh] md:leading-[3.5vh]">
                    With a list of the most common and popular tools for management, design and planning on the market,
                    you don’t need to use many apps at the same time. Add extensions and enjoy a complete workspace
                </p>
                <Link href="/features" className="w-fit focus:outline-none">
                    <Button className="lg:h-14 px-10 py-4 md:px-16 rounded-full text-black font-medium border-2 border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white">
                        Learn More
                    </Button>
                </Link>
            </div>
            <AppsImages/>
        </section>
    );
};

export default AppsIntegrationSection;
