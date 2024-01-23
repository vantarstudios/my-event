'use client';

import { useRef, useState, Fragment, type FunctionComponent } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { useAnimateOnScroll } from '@/lib/hooks';

export type Step = {
    title: string;
    description: string;
    image: StaticImageData;
};

interface EventStepProps extends Omit<Step, 'image'> {
    number: number;
    focus: boolean;
    onClick: () => void;
}

interface EventsStepsDynamicProps {
    steps: Step[];
}

const EventStep: FunctionComponent<EventStepProps> = ({ number, title, description, focus, onClick }) => {
    return (
        <div className="flex flex-col gap-5 w-full pr-20">
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

const EventsStepsDynamic: FunctionComponent<EventsStepsDynamicProps> = ({ steps }) => {
    const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    useAnimateOnScroll<HTMLDivElement>(ref, 'animate-slide-left');
    
    return (
        <Fragment>
            <div className="flex flex-col justify-start gap-10 w-2/5 h-full">
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
            <div ref={ref} className="h-[90%] aspect-video">
                <Image
                    src={steps[activeStepIndex]!.image}
                    alt="Event Creation"
                    className="shadow-2xl rounded-3xl transition-all duration-300 ease-out hover:scale-[1.015]"
                />
            </div>
        </Fragment>
    );
};

export default EventsStepsDynamic;
