import type { FunctionComponent } from 'react';
import type { PlanPackage } from '@/types';
import PlanPackageCard from './plan-package-card';

interface PlanCardProps {
    packages: PlanPackage[];
}

const PlanPackagesList: FunctionComponent<PlanCardProps> = ({ packages }) => {
    return (
        <div
            className={`flex flex-wrap items-start gap-5 w-full ${
                packages.length === 1 ? 'justify-start' : 'justify-evenly'
            }`}
        >
            {packages.map((planPackage) => (
                <PlanPackageCard key={planPackage.name} planPackage={planPackage} />
            ))}
        </div>
    );
};

export default PlanPackagesList;
