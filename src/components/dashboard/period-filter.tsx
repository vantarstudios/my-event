import type { FunctionComponent } from 'react';
import { Button } from '@components/ui/buttons';

const PeriodFilter: FunctionComponent = () => {
    return (
        <div className="flex flex-wrap justify-start items-center gap-5 w-full text-sm">
            <Button className="px-10 bg-primary">All</Button>
            <Button className="px-10">This month</Button>
            <Button className="px-10">Last 30 days</Button>
            <Button className="px-10">Last trimester</Button>
            <Button className="px-10 bg-grey">Last year</Button>
        </div>
    );
};

export default PeriodFilter;
