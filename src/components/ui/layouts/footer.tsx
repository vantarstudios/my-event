import Image from 'next/image';
import Link from 'next/link';
import type { NavigationLink } from '@/types';
import { Mail, LinkedIn, Instagram, Phone, Location } from '@components/ui/icons';

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
    { name: 'contact@eventmedia.com', href: 'mailto:contact@eventmedia.com', icon: Mail },
    { name: 'eventMedia', href: 'https://www.linkedin.com/company/eventmedia', icon: LinkedIn },
    { name: '@eventMedia', href: 'https://www.instagram.com/eventmedia', icon: Instagram },
    { name: '+229 00000000/00000000', href: 'tel:+22900000000', icon: Phone },
    { name: 'Zopah, Abomey-Calavi, Benin', href: 'https://maps.app.goo.gl/4N7mQ7SPNHob5oTL9', icon: Location },
];

const Footer = () => {
    return (
        <footer className="flex justify-between items-center w-screen h-[45vh] px-10 text-white font-extralight bg-black">
            <div className="relative h-full aspect-square">
                <Image
                    src="/logo-white.png"
                    alt="Vantar Studios Logo"
                    fill
                />
            </div>
            <div className="flex justify-evenly items-center flex-1 h-full py-20">
                {
                    [
                        firstColumnLinks,
                        secondColumnLinks,
                    ].map((links, index) => (
                        <div key={index} className="flex flex-col justify-between items-start h-full">
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
                    ))
                }
                <div className="flex flex-col justify-between items-start h-full">
                    {
                        thirdColumnLinks.map(({ name, href, icon }) => {
                            const LinkIcon = icon;
                            return (
                                <Link key={name} href={href} target="_blank" className="flex gap-4">
                                    <LinkIcon className="w-5 h-5"/>
                                    {name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </footer>
    );
};

export default Footer;
