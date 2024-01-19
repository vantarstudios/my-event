'use client';

import { useRef, useState, type FunctionComponent } from 'react';
import Image from 'next/image';
import { useAnimateOnScroll } from '@/lib/hooks';
import { imagesPlaceholder } from '@/data/images-placeholder';

type Step = {
    title: string;
    description: string;
    image: string;
};

interface EventStepProps extends Omit<Step, 'image'> {
    number: number;
    focus: boolean;
    onClick: () => void;
}

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

const EventStep: FunctionComponent<EventStepProps> = ({ number, title, description, focus, onClick }) => {
    return (
        <div className="flex flex-col gap-5 w-full h-full pr-20">
            <div
                onClick={onClick}
                className={`flex items-center gap-12 cursor-pointer ${
                    focus && 'text-primary'
                }`}
            >
                <p className={`flex justify-center items-center w-20 aspect-square text-5xl text-white bg-black rounded-full ${
                    focus && 'bg-primary'
                }`}>
                    {number}
                </p>
                <p className="text-2xl font-medium">{title}</p>
            </div>
            <p className={`pl-32 leading-[3vh] transition-all duration-300 ease-out ${
                focus ? 'opacity-100 h-fit' : 'opacity-0 h-0'
            }`}>
                {description}
            </p>
        </div>
    );
};

const EventsSection: FunctionComponent = () => {
    const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    useAnimateOnScroll<HTMLDivElement>(ref, 'animate-slide-left');
    
    return (
        <section className="flex flex-col gap-10 w-full">
            <p className="w-full text-5xl text-primary text-center font-bold">
                All you need to bring your event to life
            </p>
            <p className="w-3/5 mx-auto leading-[3.5vh] text-lg text-center">
                From creation to team management and social medias presence, your workspace is equipped with all the
                necessary tools to easily control every step of your event.
            </p>
            <div className="relative w-2/5 h-[70vh]">
                <div className="flex flex-col gap-10">
                    {
                        steps.map((step, index) => (
                            <EventStep
                                key={index}
                                number={index + 1}
                                title={step.title}
                                description={step.description}
                                focus={activeStepIndex === index}
                                onClick={() => setActiveStepIndex(index)}
                            />
                        ))
                    }
                </div>
                <div ref={ref} className="absolute top-0 left-full w-[150vh] h-[105%]">
                    <div className="relative w-full h-full">
                        <Image
                            src={steps[activeStepIndex]!.image}
                            alt="Event Creation"
                            fill
                            placeholder={imagesPlaceholder}
                            className="shadow-2xl rounded-3xl transition-all duration-300 ease-out hover:scale-[1.025]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
