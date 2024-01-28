import type { FunctionComponent } from 'react';
import { upperSnakeCaseToSentenceCase } from '@/lib/utils';
import type { WithdrawalMethod as TWithdrawalMethod } from '@/types';
import { withdrawalMethodsIcons } from '@/data/withdrawal-methods';
import { Button } from '@components/ui/buttons';
import { BankCard, Pencil, TrashCan } from '@components/ui/icons';

interface WithdrawalMethodProps extends TWithdrawalMethod {}

const WithdrawalMethod: FunctionComponent<WithdrawalMethodProps> = ({ type, label }) => {
    const WithdrawalMethodIcon = withdrawalMethodsIcons[type] || BankCard;

    return (
        <div className="flex justify-between items-center w-full p-3 text-sm bg-gray-50 hover:bg-gray-100 transform transition-all duration-200 ease-in-out">
            <div className="flex justify-center items-center gap-4 w-fit">
                <WithdrawalMethodIcon className="w-6 h-6" />
                <p className="uppercase font-medium">{upperSnakeCaseToSentenceCase(type)}</p>
                <p className="text-sm">{label}</p>
            </div>
            <div className="flex justify-center items-center gap-8 w-fit">
                <Button className="flex items-center gap-2 w-fit p-0 text-black bg-inherit hover:underline">
                    <Pencil className="w-3 h-3" />
                    Edit
                </Button>
                <Button className="flex items-center gap-2 w-fit p-0 text-black bg-inherit hover:underline">
                    <TrashCan className="w-3 h-3" />
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default WithdrawalMethod;
