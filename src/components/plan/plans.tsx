'use client';

import { useState } from 'react';
import type { FunctionComponent } from 'react';
import type { Plan } from '@/types';
import { Button } from '@components/ui/buttons';
import plans from '@/data/plans';
import PlanPackagesList from './plan-packages-list';

interface PlansProps {
    layout: 'left' | 'centered' | 'right';
}

const layoutsStyle: Record<PlansProps['layout'], string> = {
    left: 'justify-start',
    centered: 'justify-center',
    right: 'justify-end',
};

const Plans: FunctionComponent<PlansProps> = ({ layout }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0] as Plan);

    return (
        <div className="flex flex-col justify-start items-start gap-5 h-full">
            <div className={`flex flex-wrap gap-0.5 w-full ${layoutsStyle[layout]}`}>
                {plans.map((plan, index) => (
                    <Button
                        key={plan.name}
                        className={`basis-40 text-sm rounded-none ${plan.name === selectedPlan.name && 'bg-primary'} ${
                            index === 0 && 'rounded-l-lg'
                        } ${index === plans.length - 1 && 'rounded-r-lg'}`}
                        onClick={() => setSelectedPlan(plan)}
                    >
                        {plan.name}
                    </Button>
                ))}
            </div>
            <PlanPackagesList packages={selectedPlan.packages} />
        </div>
    );
};

export default Plans;
