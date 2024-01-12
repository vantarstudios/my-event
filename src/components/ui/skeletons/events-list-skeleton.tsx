import type { FunctionComponent } from 'react';

interface EventsListProps {
    number: number;
    cardFormat: 'titled' | 'unconstrained';
}

const EventsListSkeleton: FunctionComponent<EventsListProps> = ({ number, cardFormat }) => {
    return (
        <div className="flex flex-wrap gap-5 w-full">
            {
                [...Array(number)].map((_, id) => (
                    <div
                        key={id}
                        className={`relative flex flex-col gap-2 ${
                            cardFormat === 'unconstrained' ? 'w-full h-full' : 'w-[250px]'
                    }`}>
                        <div className={`min-w-[250px] min-h-[170px] rounded-3xl skeleton ${
                            cardFormat === 'unconstrained' ? 'h-full' : 'w-[250px] h-[170px]'
                        }`}/>
                        <div className="w-3/4 h-5 rounded-full skeleton"/>
                    </div>
                ))
            }
        </div>
    );
};

export default EventsListSkeleton;
