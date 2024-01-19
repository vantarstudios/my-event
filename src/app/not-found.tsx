import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { imagesPlaceholder } from '@/data/images-placeholder';
import { Header } from '@components/ui/layouts';
import { Button } from '@components/ui/buttons';

const NotFoundPage: NextPage = () => {
  return (
      <div className="flex flex-col w-screen h-screen">
          <Header/>
          <section className="fixed bottom-0 left-0 flex flex-col md:flex-row justify-between items-center gap-5 px-20 w-full h-[85vh]">
              <div className="flex flex-col items-center md:items-start gap-7 w-full md:w-1/2">
                  <p className="text-[7vw] leading-[7vw] font-bold">
                      <span className="text-[7vw] leading-[7vw]">O</span>
                      <span className="text-[7vw] leading-[7vw] text-primary">oo</span>
                      ps!
                  </p>
                  <p className="text-lg leading-[3.5vh]">
                      This page could not load. This may be a maintenance or construction issue. Try reloading the page
                      later
                      but in the main time feel free to create the next big event.
                  </p>
                  <Link href="/" className="w-fit focus:outline-none">
                      <Button className="h-14 px-10 font-normal hover:bg-primary">Back to Home page</Button>
                  </Link>
              </div>
              <div className="relative w-full md:w-1/2 h-full">
                  <Image
                      src="/images/404.svg"
                      alt="404"
                      fill
                      placeholder={imagesPlaceholder}
                      priority={true}
                  />
              </div>
          </section>
      </div>
  );
};

export default NotFoundPage;
