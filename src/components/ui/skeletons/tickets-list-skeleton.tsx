import type { FunctionComponent } from 'react';

interface TicketsListSkeletonProps {
    number: number;
}

const TicketsListSkeleton: FunctionComponent<TicketsListSkeletonProps> = ({ number }) => {
    return (
        <div className="flex flex-wrap gap-5 w-full">
            {[...Array(number)].map((_, id) => <div key={id} className="w-full h-14 rounded-md skeleton"/>)}
        </div>
    );
};

export default TicketsListSkeleton;
