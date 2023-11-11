import { Fragment } from 'react';
import type { NextPage } from 'next';
import { thousandsCommaFormat } from '@/lib/utils';
import { ViewTitle, CreateWorkspaceButton, PeriodFilter, CardWithTitle } from '@components/dashboard';
import { Button } from '@components/common';
import { TitledArea } from '@components/common/layouts';
import { PaymentMethod } from '@components/dashboard/finance';
import { Dollar } from '@components/icons';
import paymentMethods from '@/data/payment-methods';

const DashboardFinancePage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Dollar}>Finances</ViewTitle>
                <CreateWorkspaceButton />
            </div>
            <PeriodFilter />
            <div className="flex flex-wrap justify-between items-start gap-10 child:2/5 w-full">
                <CardWithTitle
                    title="Total balance"
                    middle={
                        <Fragment>
                            <p>${thousandsCommaFormat(25690.3)}</p>
                            <p className="text-lg font-medium text-green-700">+2.5%</p>
                        </Fragment>
                    }
                    bottom={<p className="font-medium">All</p>}
                />
                <CardWithTitle
                    title="Ticket processing fees"
                    middle={<p>${thousandsCommaFormat(3512.1)}</p>}
                    bottom={<p className="font-medium">All</p>}
                    corner={<p className="text-lg font-medium">5%</p>}
                />
            </div>
            <TitledArea title="Payment methods" className="w-full">
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
