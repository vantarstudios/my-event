import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NavigationLink } from '@/types';
import { ScrollToTopButton } from '@components/root';
import { Mail, Instagram, Phone } from '@components/ui/icons';

const firstColumnLinks: NavigationLink[] = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Ads', href: '/ads' },
    { name: 'Contact us', href: '/contact-us' },
    { name: 'FAQ', href: '/faq' },
];

const secondColumnLinks: NavigationLink[] = [
    { name: 'Terms and Conditions', href: '/policies/terms-and-conditions' },
    { name: 'Events Policy', href: '/policies/events-policy' },
    { name: 'Tickets Policy', href: '/policies/tickets-policy' },
    { name: 'Privacy Policy', href: '/policies/privacy-policy' },
    { name: 'Cookie Policy', href: '/policies/cookie-policy' },
];

const thirdColumnLinks: Required<NavigationLink>[] = [
    { name: 'infos@vantarstudios.com', href: 'mailto:infos@vantarstudios.com', icon: Mail },
    { name: '@event__media', href: 'https://www.instagram.com/event__media', icon: Instagram },
    { name: '+229 51 98 72 66', href: 'tel:+22951987266', icon: Phone },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="flex flex-col w-screen xl:h-[50vh] lg:px-10 text-white font-extralight bg-black">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full flex-1">
                <div className="relative w-[50vw] md:w-[30vw] xl:w-auto lg:h-full aspect-square">
                    <Image
                        src="/logo-white.png"
                        alt="Vantar Studios Logo"
                        fill
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-evenly items-center w-full lg:flex-1 h-full lg:py-20">
                    {
                        [
                            firstColumnLinks,
                            secondColumnLinks,
                        ].map((links, index) => (
                            <Fragment key={index}>
                                <div className="flex flex-col justify-between items-center md:items-start gap-8 sm:gap-5 xl:gap-0 h-full">
                                    {
                                        links.map(({ name, href }) => (
                                            <Link
                                                key={name}
                                                href={href}
                                                className="hover:underline hover:decoration-1 hover:underline-offset-2"
                                            >
                                                {name}
                                            </Link>
                                        ))
                                    }
                                </div>
                                <hr className="md:hidden w-20 my-6 border-2 border-white rounded-full"/>
                            </Fragment>
                        ))
                    }
                    <div className="flex flex-col justify-between items-center md:items-start gap-8 sm:gap-5 xl:gap-0 h-full">
                        {
                            thirdColumnLinks.map(({ name, href, icon }) => {
                                const LinkIcon = icon;
                                return (
                                    <Link key={name} href={href} target="_blank" className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
                                        <LinkIcon className="w-8 h-8 md:w-5 md:h-5"/>
                                        {name}
                                    </Link>
                                )
                            })
                        }
                        <span/>
                    </div>
                </div>
            </div>
            <ScrollToTopButton className="md:hidden mx-auto my-10"/>
            <p className="w-full md:mt-10 lg:mt-0 mb-10 text-sm text-center">Vantar Studios &copy; Copyright {currentYear}</p>
        </footer>
    );
};

export default Footer;
