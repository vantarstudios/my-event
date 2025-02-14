import type { FunctionComponent } from 'react';
import type { PlanPackage } from '@/types';
import { thousandsCommaFormat } from '@/lib/utils';
import { Card } from '@components/ui/layouts';

interface PlanCardProps {
    planPackage: PlanPackage;
}

const PlanPackageCard: FunctionComponent<PlanCardProps> = ({ planPackage }) => {
    return (
        <Card
            className={`flex flex-col justify-center items-center gap-5 py-10 w-80 h-fit ${
                planPackage.isCurrent
                    ? 'border-2 border-primary border-opacity-100 shadow-none'
                    : 'shadow-lg cursor-pointer'
            }`}
        >
            <p className="text-2xl text-primary font-medium">{planPackage.name}</p>
            <p className="flex flex-col items-center text-xl font-semibold">
                ${thousandsCommaFormat(planPackage.price)}
                {planPackage.monthly && <span className="text-sm">monthly</span>}
            </p>
            {planPackage.yearly && (
                <p className="text-sm text-primary font-semibold">${thousandsCommaFormat(planPackage.yearly)} Yearly</p>
            )}
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
