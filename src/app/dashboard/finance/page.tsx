import { Fragment } from 'react';
import type { NextPage } from 'next';
import { ViewTitle, CreateWorkspaceButton, PeriodFilter, CardWithTitle } from '@components/dashboard';
import { Button } from '@components/common';
import { TitledArea } from '@components/common/layouts';
import { PaymentMethod } from '@components/dashboard/finance';
import { Dollar } from '@components/icons';
import type { PaymentMethod as PaymentMethodType } from '@/types';

const paymentMethods: { readonly type: PaymentMethodType; readonly label: string }[] = [
    {
        type: 'card',
        label: 'MasterCard ****0000',
    },
];

const DashboardFinancePage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Dollar}>Finances</ViewTitle>
                <CreateWorkspaceButton />
            </div>
            <PeriodFilter />
            <div className="flex justify-start items-start gap-40">
                <CardWithTitle
                    title="Total balance"
                    middle={
                        <Fragment>
                            <p>$25,690.30</p>
                            <p className="text-lg font-medium text-green-700">+2.5%</p>
                        </Fragment>
                    }
                    bottom={<p className="font-medium">All</p>}
                />
                <CardWithTitle
                    title="Ticket processing fees"
                    middle={<p>$3,512.10</p>}
                    bottom={<p className="font-medium">All</p>}
                    corner={<p className="text-lg font-medium">5%</p>}
                />
            </div>
            <TitledArea title="Payment methods">
                <div className="relative flex flex-col w-full pt-5">
                    <Button className="absolute bottom-full right-0 px-8">+ Add payment method</Button>
                    {paymentMethods.map(({ type, label }) => (
                        <PaymentMethod key={label} type={type} label={label} />
                    ))}
                </div>
            </TitledArea>
        </div>
    );
};

export default DashboardFinancePage;
