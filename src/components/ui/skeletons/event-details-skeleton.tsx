import type { FunctionComponent } from 'react';

const EventsDetailsSkeleton: FunctionComponent = () => {
    return (
        <div className="flex w-full h-full">
            <div className="w-1/3 h-full rounded-3xl skeleton"/>
            <div className="flex flex-col gap-8 w-2/3 h-full pl-10">
                <p className="w-1/2 h-10 rounded-lg skeleton"/>
                <p className="w-full h-40 rounded-lg skeleton"/>
                <div className="flex flex-wrap justify-start items-center gap-2 w-full h-fit">
                    <div className="w-20 h-10 rounded-full skeleton"/>
                    <div className="w-20 h-10 rounded-full skeleton"/>
                    <div className="w-20 h-10 rounded-full skeleton"/>
                </div>
                <div className="w-full h-40 rounded-lg skeleton"/>
            </div>
        </div>
    );
};

export default EventsDetailsSkeleton;
