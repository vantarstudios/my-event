import { Fragment } from 'react';
import type { NextPage } from 'next';
import { thousandsCommaFormat } from '@/lib/utils';
import { ViewTitle, CreateWorkspaceButton, PeriodFilter } from '@components/dashboard';
import { WithdrawalMethod, WithdrawModalAndButton } from '@components/dashboard/finance';
import { Button } from '@components/ui/buttons';
import { TitledArea, CardWithTitle } from '@components/ui/layouts';
import { Dollar } from '@components/ui/icons';
import { withdrawalMethods } from '@/data/withdrawal-methods';

const DashboardFinancePage: NextPage = () => {
    return (
        <div className="relative flex flex-col gap-8 h-full">
            <div className="flex justify-between items-center">
                <ViewTitle Icon={Dollar}>Finances</ViewTitle>
                <CreateWorkspaceButton/>
            </div>
            <PeriodFilter/>
            <div className="flex flex-wrap justify-start items-start gap-10 child:2/5 w-full">
                <CardWithTitle
                    title="Total balance"
                    middle={
                        <Fragment>
                            <p className="text-4xl">${thousandsCommaFormat(25690.3)}</p>
                            <p className="text-lg font-medium text-green-700">+2.5%</p>
                        </Fragment>
                    }
                    corner={<WithdrawModalAndButton/>}
                    bottom={<p className="font-medium">All</p>}
                />
                <CardWithTitle
                    title="Ticket processing fees"
                    middle={<p className="text-4xl">${thousandsCommaFormat(3512.1)}</p>}
                    bottom={<p className="font-medium">All</p>}
                    corner={<p className="text-lg font-medium">5%</p>}
                />
            </div>
            <TitledArea
                title="Withdrawal methods"
                className="w-full"
                indicator={<Button className="text-sm">+ Add withdrawal method</Button>}
            >
                <div className="flex flex-col gap-y-5 w-full pt-5">
                    {withdrawalMethods.map(({ type, label }) => (
                        <WithdrawalMethod key={label} type={type} label={label}/>
                    ))}
                </div>
            </TitledArea>
        </div>
    );
};

export default DashboardFinancePage;
