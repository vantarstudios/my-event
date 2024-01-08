import type { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@components/ui/buttons';
import googleImage from '@public/images/landing-google.png';
import figmaImage from '@public/images/landing-figma.png';
import slackImage from '@public/images/landing-slack.png';

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
            <div className="relative flex justify-center w-[45%] h-full">
                <Image
                    src={googleImage}
                    alt="Google"
                    className="w-[30vh] aspect-square transform -rotate-12"
                />
                <Image
                    src={slackImage}
                    alt="Google"
                    className="w-[38vh] aspect-square transform rotate-12 absolute top-1/4 left-1/2"
                />
                <Image
                    src={figmaImage}
                    alt="Google"
                    className="w-[35vh] aspect-square absolute top-3/4 left-1/4"
                />
            </div>
        </section>
    );
};

export default AppsIntegrationSection;
