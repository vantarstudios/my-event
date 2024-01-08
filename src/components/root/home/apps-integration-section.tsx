import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/buttons';
import AppsImages from './apps-images';

const AppsIntegrationSection: FunctionComponent = () => {
    return (
        <section className="flex justify-between w-full">
            <div className="flex flex-col gap-[5vh] w-1/2 py-[5vh]">
                <p className="text-5xl text-primary font-bold">
                    Integrate your favorite apps to make improve your workspace experience.
                </p>
                <p className="text-lg">
                    With a list of the most common and popular tools for management, design and planning on the market,
                    you don’t need to use many apps at the same time. Add extensions and enjoy a complete workspace
                </p>
                <Link href="/features" className="w-fit focus:outline-none">
                    <Button className="px-[8vh] text-black font-medium border-2 border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white">
                        Learn More
                    </Button>
                </Link>
            </div>
            <AppsImages/>
        </section>
    );
};

export default AppsIntegrationSection;
