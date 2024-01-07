'use client';

import { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { PageContainer } from '@components/root';
import { SectionDivider, Button } from '@components/ui';
import imageOne from '@public/images/landing-2.png';
import imageTwo from '@public/images/landing-3.png';

const features: Readonly<{
    topics: string[];
    title: string;
    description: string;
    picture: StaticImageData
}>[] = [
    {
        topics: ['all'],
        title: 'Overview',
        description: 'MyEvent is eventMedia’s management tool for organizations, planners and individuals also to create, ' +
            'manage and communicate their events; All events being aired on the social app of eventMedia. ' +
            'Build teams and lead tasks across them to bring your idea or concept to life, ' +
            'all in an eco-friendly workspace customized with the best possible options: ' +
            'chat, analytics, social medias, extensions etc...',
        picture: imageOne,
    },
    {
        topics: ['all', 'workspace'],
        title: 'Create your workspace',
        description: 'Aren’t you tired of using all this apps to reach each member of your team? ' +
            'Or having to verbally manage task around your team and also with contractors? ' +
            'We got you! Create your unique workspace for you, ' +
            'your team and even contractors and start getting the work done now. ' +
            'Assign tasks, manage your staff and keep track of your overall performance with deep analytics.',
        picture: imageTwo,
    },
    {
        topics: ['all', 'events'],
        title: 'Create your event',
        description: 'Once your workspace is running, it’s time to launch your first event. ' +
            'We made it as easy as possible: name your event, add a location, date & time and a cover image. ' +
            'That’s it! Now, set a timeline for event and assign task to your staff. ' +
            'To make it easier, you can team your staff members in groups with common or individual tasks.',
        picture: imageOne,
    },
    {
        topics: ['all', 'analytics', 'socials'],
        title: 'Promote and analyze',
        description: 'You have created your workspace, launch your first event, what’s next? ' +
            'That’s right, it’s time to promote your event and collect analysis data. ' +
            'Link the social medias accounts you wish to use and run ads across them and visualize real time data.',
        picture: imageTwo,
    }
];

const filters: Readonly<{ label: string; value: string }>[] = [
    { label: 'All', value: 'all', },
    { label: 'Staff Management', value: 'workspace', },
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
            <section className="flex flex-col gap-[5vh]">
                <p className="w-full pl-[10vh] text-10xl text-start font-bold">Features</p>
                <div className="flex justify-center gap-[10vh]">
                    {
                        filters.map(({ label, value }) => (
                            <Button
                                key={value}
                                onClick={() => filter !== value && setFilter(value)}
                                className={`border-2 ${filter === value
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
                        <section className="flex flex-col items-center gap-[5vh]">
                            <p className="w-full text-center text-5xl text-primary font-bold">
                                {feature.title}
                            </p>
                            <p className="w-2/3 text-lg text-center">
                                {feature.description}
                            </p>
                            <div className="relative w-[75vh]">
                                <Image
                                    src={feature.picture}
                                    alt={feature.title}
                                    layout="responsive"
                                    className="rounded-2xl shadow-xl"
                                />
                            </div>
                            <Link href="/auth/signup" className="w-fit focus:outline-none mt-[5vh]">
                                <Button className="px-[8vh] text-lg font-normal hover:bg-primary">
                                    Try it now
                                </Button>
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
