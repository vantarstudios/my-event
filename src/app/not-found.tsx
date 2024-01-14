import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@components/ui/buttons';
import notFoundImage from '@public/images/404.svg';

const NotFoundPage: NextPage = () => {
  return (
      <section className="flex flex-col md:flex-row justify-between items-center gap-5 w-screen h-screen p-20">
          <div className="flex flex-col items-center md:items-start gap-7 w-full md:w-1/2">
              <p className="text-[7vw] leading-[7vw] font-bold">
                  <span className="text-[7vw] leading-[7vw]">O</span>
                  <span className="text-[7vw] leading-[7vw] text-primary">oo</span>
                  ps!
              </p>
              <p className="text-lg leading-[3.5vh]">
                  This page could not load. This may be a maintenance or construction issue. Try reloading the page later
                  but in the main time feel free to create the next big event.
              </p>
              <Link href="/" className="w-fit focus:outline-none">
                  <Button className="h-14 px-10 font-normal hover:bg-primary">Back to Home page</Button>
              </Link>
          </div>
          <div className="relative">
              <Image
                  src={notFoundImage}
                  alt="404"
                  priority={true}
              />
          </div>
      </section>
  );
};

export default NotFoundPage;
