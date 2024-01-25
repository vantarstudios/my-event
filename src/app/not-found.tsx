import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@components/ui/layouts';
import { Button } from '@components/ui/buttons';

const NotFoundPage: NextPage = () => {
  return (
      <>
          <Header/>
          <main className="fixed bottom-0 left-0 flex flex-col md:flex-row justify-center items-center gap-5 w-screen h-[86vh] md:h-[85vh] mt-[15vh] overflow-hidden">
              <div className="flex flex-col items-center md:items-start gap-7 w-full md:w-1/2 px-5 md:px-10 xl:px-20">
                  <p className="text-6xl md:text-8xl font-bold">
                      <span className="text-6xl md:text-8xl">O</span>
                      <span className="text-6xl md:text-8xl text-primary">oo</span>
                      ps!
                  </p>
                  <p className="text-center lg:text-start lg:text-lg lg:leading-[3.5vh]">
                      This page could not load. This may be a maintenance or construction issue. Try reloading the page
                      later
                      but in the main time feel free to create the next big event.
                  </p>
                  <Link href="/" className="w-fit focus:outline-none">
                      <Button className="px-10 py-4 md:px-16 rounded-full lg:text-lg font-normal hover:bg-primary">Back to Home page</Button>
                  </Link>
              </div>
              <div className="relative w-full aspect-video md:w-1/2 md:h-full md:aspect-auto">
                  <Image
                      src="/images/404.svg"
                      alt="404"
                      fill
                      priority
                  />
              </div>
          </main>
      </>
  );
};

export default NotFoundPage;
