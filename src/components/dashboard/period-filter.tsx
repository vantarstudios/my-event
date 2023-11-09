import type { FunctionComponent } from 'react';
import { Button } from '@components/common';

const PeriodFilter: FunctionComponent = () => {
    return (
        <div className="flex flex-wrap justify-start items-center gap-5">
            <Button className="px-10 text-sm bg-primary">All</Button>
            <Button className="px-10 text-sm">This month</Button>
            <Button className="px-10 text-sm">Last 30 days</Button>
            <Button className="px-10 text-sm">Last trimester</Button>
            <Button className="px-10 text-sm bg-grey">Last year</Button>
        </div>
    );
};

export default PeriodFilter;
