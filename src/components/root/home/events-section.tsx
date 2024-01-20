'use client';

import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { imagesPlaceholder } from '@/data/images-placeholder';
import EventsStepsDynamic, { type Step } from './events-steps-dynamic';

const steps: Step[] = [
    {
        title: 'Create',
        description: 'Describe your event, set its category, name and date, add the location and the teams involved. Use the site map tool to draw with more precision your event’s site and label spaces for your passes.',
        image: '/images/landing-3.png'
    },
    {
        title: 'Manage',
        description: 'Invite your team members and assign them to the different tasks of your event. Create schedules, set deadlines and follow the progress of your event in real time.',
        image: '/images/landing-4.png'
    },
    {
        title: 'Promote',
        description: 'Create your event’s website and social media pages. Share your event with your audience and keep them updated with the latest news.',
        image: '/images/landing-5.png'
    },
];

interface EventStepProps extends Step {
    number: number;
}

const EventStep: FunctionComponent<EventStepProps> = ({ number, title, description, image }) => {
    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <p className="flex justify-center items-center w-16 aspect-square text-4xl text-white bg-black rounded-full">
                {number}
            </p>
            <p className="text-xl text-primary font-semibold">{title}</p>
            <p className="text-center leading-[3vh] transition-all duration-300 ease-out">
                {description}
            </p>
            <div className="relative w-full aspect-video">
                <Image
                    src={image}
                    alt="Event Creation"
                    fill
                    placeholder={imagesPlaceholder}
                    className="shadow-md md:shadow-xl rounded-2xl md:rounded-3xl transition-all duration-300 ease-out hover:scale-[1.025]"
                />
            </div>
        </div>
    );
};

const EventsSection: FunctionComponent = () => {
    return (
        <section className="flex flex-col gap-5 md:gap-10 w-full">
            <p className="w-full text-3xl md:text-5xl text-primary text-center font-bold">
                All you need to bring your event to life
            </p>
            <p className="w-full md:w-3/5 md:mx-auto leading-[2.5vh] md:leading-[3.5vh] text-base md:text-lg text-center">
                From creation to team management and social medias presence, your workspace is equipped with all the
                necessary tools to easily control every step of your event.
            </p>
            <div className="hidden lg:block relative w-2/5 h-[70vh]">
                <EventsStepsDynamic steps={steps}/>
            </div>
            <div className="flex flex-col gap-10 lg:hidden relative w-full">
                {
                    steps.map((step, index) => (
                        <EventStep
                            key={index}
                            number={index + 1}
                            {...step}
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default EventsSection;
