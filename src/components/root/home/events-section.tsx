'use client';

import { useState, type FunctionComponent } from 'react';
import Image from 'next/image';
import landingImageThree from '@public/images/landing-3.png';

interface EventStepProps {
    number: number;
    title: string;
    description: string;
    focus: boolean;
    onClick: () => void;
}

const EventStep: FunctionComponent<EventStepProps> = ({ number, title, description, focus, onClick }) => {
    return (
        <div className="flex flex-col gap-[5vh] w-full h-full pr-[10vh]">
            <div
                onClick={onClick}
                className={`flex items-center gap-[5vh] cursor-pointer ${
                    focus && 'text-primary'
                }`}
            >
                <p className={`flex justify-center items-center w-[10vh] aspect-square text-5xl text-white bg-black rounded-full ${
                    focus && 'bg-primary'
                }`}>
                    {number}
                </p>
                <p className="text-2xl font-medium">{title}</p>
            </div>
            <p className={`transition-all duration-300 ease-out ${focus ? 'opacity-100 h-fit' : 'opacity-0 h-0'}`}>
                {description}
            </p>
        </div>
    );
};

const EventsSection: FunctionComponent = () => {
    const [activeStep, setActiveStep] = useState<number>(1);
    
    return (
        <section className="flex flex-col gap-[5vh] w-full">
            <p className="w-full text-5xl text-primary text-center font-bold">
                All you need to bring your event to life
            </p>
            <p className="text-xl text-center">
                From creation to team management and social medias presence, your workspace is equipped with all the
                necessary tools to easily control every step of your event.
            </p>
            <div className="relative w-2/5 h-[70vh]">
                <div className="flex flex-col gap-[5vh]">
                    <EventStep
                        number={1}
                        title="Create"
                        description="Describe your event, set its category, name and date, add the location and the teams involved.
                    Use the site map tool to draw with more precision your event’s site and label spaces for your
                    passes."
                        focus={activeStep === 1}
                        onClick={() => setActiveStep(1)}
                    />
                    <EventStep
                        number={2}
                        title="Manage"
                        description="Invite your team members and assign them to the different tasks of your event. Create
                    schedules, set deadlines and follow the progress of your event in real time."
                        focus={activeStep === 2}
                        onClick={() => setActiveStep(2)}
                    />
                    <EventStep
                        number={3}
                        title="Promote"
                        description="Create your event’s website and social media pages. Share your event with your audience
                    and keep them updated with the latest news."
                        focus={activeStep === 3}
                        onClick={() => setActiveStep(3)}
                    />
                </div>
                <div className="absolute top-0 left-full w-[150vh]">
                    <Image
                        src={landingImageThree}
                        alt="Event Creation"
                        className="shadow-2xl rounded-2xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
