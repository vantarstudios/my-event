import type { FunctionComponent } from 'react';
import type { PlanPackage } from '@/types';
import { Card } from '@components/common';

interface PlanCardProps {
    planPackage: PlanPackage;
}

const PlanPackageCard: FunctionComponent<PlanCardProps> = ({ planPackage }) => {
    return (
        <Card
            className={`flex flex-col justify-center items-center gap-5 py-10 w-80 h-full ${
                planPackage.isCurrent
                    ? 'border-2 border-primary border-opacity-100 shadow-none'
                    : 'shadow-lg cursor-pointer'
            }`}
        >
            <p className="text-2xl text-primary font-medium">{planPackage.name}</p>
            <p className="flex flex-col items-center text-xl font-semibold">
                ${planPackage.price}
                {planPackage.monthly && <p className="text-sm">monthly</p>}
            </p>
            {planPackage.yearly && <p className="text-sm text-primary font-semibold">${planPackage.yearly} Yearly</p>}
            <hr className="w-1/2 border-2 border-primary" />
            <ul className="flex flex-col gap-3 list-disc pt-2 text-sm">
                {planPackage.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>
        </Card>
    );
};

export default PlanPackageCard;
