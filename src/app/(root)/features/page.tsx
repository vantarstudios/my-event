'use client';

import { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageContainer, SectionDivider } from '@components/root';
import { Button, PrimaryButton } from '@components/ui/buttons';

const features: Readonly<{
    topics: string[];
    title: string;
    description: string;
    picture: string,
}>[] = [
    {
        topics: ['all'],
        title: 'Overview',
        description: 'MyEvent is eventMedia’s management tool for organizations, planners and individuals also to create, ' +
            'manage and communicate their events; All events being aired on the social app of eventMedia. ' +
            'Build teams and lead tasks across them to bring your idea or concept to life, ' +
            'all in an eco-friendly workspace customized with the best possible options: ' +
            'chat, analytics, social medias, extensions etc...',
        picture: '/images/landing-1.png'
    },
    {
        topics: ['all', 'workspace', 'staff'],
        title: 'Create your workspace',
        description: 'Aren’t you tired of using all this apps to reach each member of your team? ' +
            'Or having to verbally manage task around your team and also with contractors? ' +
            'We got you! Create your unique workspace for you, ' +
            'your team and even contractors and start getting the work done now. ' +
            'Assign tasks, manage your staff and keep track of your overall performance with deep analytics.',
        picture: '/images/landing-2.png'
    },
    {
        topics: ['all', 'events'],
        title: 'Create your event',
        description: 'Once your workspace is running, it’s time to launch your first event. ' +
            'We made it as easy as possible: name your event, add a location, date & time and a cover image. ' +
            'That’s it! Now, set a timeline for event and assign task to your staff. ' +
            'To make it easier, you can team your staff members in groups with common or individual tasks.',
        picture: '/images/landing-3.png'
    },
    {
        topics: ['all', 'analytics', 'socials'],
        title: 'Promote and analyze',
        description: 'You have created your workspace, launch your first event, what’s next? ' +
            'That’s right, it’s time to promote your event and collect analysis data. ' +
            'Link the social medias accounts you wish to use and run ads across them and visualize real time data.',
        picture: '/images/landing-2.png'
    }
];

const filters: Readonly<{ label: string; value: string }>[] = [
    { label: 'All', value: 'all', },
    { label: 'Staff Management', value: 'staff', },
    { label: 'Analytics', value: 'analytics', },
    { label: 'Events', value: 'events', },
    { label: 'Social Medias', value: 'socials', },
    { label: 'Workspace', value: 'workspace', },
];

const FeaturesPage: NextPage = () => {
    const [filter, setFilter] = useState('all');
    
    const filteredFeatures = features.filter(({ topics }) => topics.includes(filter));
    
    return (
        <PageContainer>
            <section className="flex flex-col gap-5 lg:gap-10">
                <p className="w-full lg:pl-20 text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-start font-bold">Features</p>
                <div className="flex flex-wrap lg:justify-between gap-x-5 gap-y-2.5 lg:pl-20">
                    {
                        filters.map(({ label, value }) => (
                            <Button
                                key={value}
                                onClick={() => filter !== value && setFilter(value)}
                                className={`border-2 max-md:px-5 ${filter === value
                                    ? 'text-white bg-primary border-primary'
                                    : 'text-black bg-white border-black hover:text-white hover:bg-black hover:bg-opacity-100'
                                }`}
                            >
                                {label}
                            </Button>
                        ))
                    }
                </div>
            </section>
            <SectionDivider />
            {
                filteredFeatures.map((feature, index) => (
                    <Fragment key={index}>
                        <section className="flex flex-col items-center gap-5 lg:gap-5">
                            <p className="w-full text-center text-3xl lg:text-4xl text-primary font-bold">
                                {feature.title}
                            </p>
                            <p className="w-full lg:w-2/3 lg:text-lg text-center">
                                {feature.description}
                            </p>
                            <div className="relative w-full lg:w-[75vh] aspect-video">
                                <Image
                                    src={feature.picture}
                                    alt={feature.title}
                                    fill
                                    sizes="100%, 100%"
                                    className="rounded-2xl shadow-xl"
                                />
                            </div>
                            <Link href="/auth/signup" className="w-fit focus:outline-none mt-5 lg:mt-10">
                                <PrimaryButton className="px-10 py-4 md:px-16 rounded-full lg:text-lg font-normal">
                                    Try it now
                                </PrimaryButton>
                            </Link>
                        </section>
                        {index < filteredFeatures.length - 1 && <SectionDivider/>}
                    </Fragment>
                ))
            }
        </PageContainer>
    )
};

export default FeaturesPage;
