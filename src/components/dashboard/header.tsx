import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const menuLinks: { readonly name: string, readonly href: string }[] = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Ads', href: '/ads' },
    { name: 'Contact us', href: '/contact-us' },
];

const Header: FunctionComponent = () => {
    return (
        <header className="flex justify-between items-start w-screen h-[200px] px-[108px] pt-[70px]">
            <Link href="/">
                <Image
                    src="/event-media-logo.svg"
                    alt="Event Media Logo"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px]"
                />
            </Link>
            <nav className="flex items-center gap-[50px] w-fit h-[80px]">
                <ul className="flex items-center gap-[50px]">
                    {
                        menuLinks.map(({ name, href}) => (
                            <li key={name} className="font-medium">
                                <Link href={href}>{name}</Link>
                            </li>
                        ))
                    }
                </ul>
                <Link href="/signup">
                    <Image
                        src="/dash-profile.svg"
                        alt="Profile Picture"
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px]"
                    />
                </Link>
            </nav>
        </header>
    );
};

export default Header;
