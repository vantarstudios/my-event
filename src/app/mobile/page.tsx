import type { NextPage } from 'next';
import Image from 'next/image';
import mobileImage from '@public/images/mobile.svg';

const MobilePage: NextPage = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <div className="flex flex-col justify-start items-center gap-5 w-screen h-screen p-5">
            <div className="relative w-1/2 aspect-square">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                />
            </div>
            <p className="text-7xl font-bold">
                <span className="text-7xl">O</span>
                <span className="text-7xl text-primary">oo</span>
                ps!
            </p>
            <div className="relative">
                <Image
                    src={mobileImage}
                    alt="Mobile"
                    priority={true}
                />
            </div>
            <p className="text-center">
                For better experience, this website can only be accessed on a bigger screen. So, sorry about that!
            </p>
            <p className="w-full mt-auto mb-5 text-sm text-center">
                Vantar Studios &copy; Copyright {currentYear}
            </p>
        </div>
    );
};

export default MobilePage;
