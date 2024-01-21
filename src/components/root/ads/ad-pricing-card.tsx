import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { Card } from '@components/ui/layouts';
import { Button } from '@components/ui/buttons';

interface AdPricingCardProps {
    duration: string;
    description: string;
    price: string;
}
const AdPricingCard: FunctionComponent<AdPricingCardProps> = ({ duration, description, price }) => {
    return (
        <Card className="flex flex-col justify-between items-center gap-5 w-full sm:w-1/3 xl:w-1/5 py-14 rounded-3xl xl:rounded-4xl">
            <p className="w-full text-center capitalize text-4xl text-primary font-semibold">
                {duration}
            </p>
            <p className="text-center">
                {description}
            </p>
            <div className="flex flex-col gap-5">
                <p className="w-full text-xl text-center font-semibold">
                    {price}
                </p>
                <hr className="w-3/4 mx-auto border-2 border-primary"/>
                <Link href="/ads/create" className="w-fit focus:outline-none">
                    <Button className="hover:bg-primary hover:bg-opacity-100">
                        Run now
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default AdPricingCard;
