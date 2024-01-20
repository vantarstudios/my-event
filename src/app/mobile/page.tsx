import type { NextPage } from 'next';
import Image from 'next/image';
import { imagesPlaceholder } from '@/data/images-placeholder';

const MobilePage: NextPage = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <div className="flex flex-col justify-between items-center gap-10 w-screen h-screen">
            <div className="relative w-1/2 aspect-square">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                />
            </div>
            <div className="flex flex-col justify-start items-center gap-5 w-full flex-1">
                <p className="text-7xl font-bold">
                    <span className="text-7xl">O</span>
                    <span className="text-7xl text-primary">oo</span>
                    ps!
                </p>
                <div className="relative w-[110%] aspect-video">
                    <Image
                        src="/images/mobile.svg"
                        alt="Mobile"
                        fill
                        placeholder={imagesPlaceholder}
                        priority={true}
                    />
                </div>
                <p className="text-center font-medium px-5">
                    For better experience, this website can only be accessed on a bigger screen. So, sorry about that!
                </p>
            </div>
            <p className="w-full mt-auto mb-5 text-sm text-center">
                Vantar Studios &copy; Copyright {currentYear}
            </p>
        </div>
    );
};

export default MobilePage;
