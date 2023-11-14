import type { FunctionComponent, ReactNode } from 'react';
import { capitalize } from '@/lib/utils';
import { AccountTypes } from '@/types';
import type { AccountType } from '@/types';
import { Card } from '@components/ui';
import { User, People } from '@components/icons';

interface AccountTypeChooserProps {
    currentType: AccountType | null;
    onTypeChange: (type: AccountType) => void;
}

const unavailableTypes: AccountType[] = ['organization'];

const accountTypeIcons: Record<AccountType, ReactNode> = {
    individual: <User className="w-16 h-16" />,
    organization: <People className="w-16 h-16" />,
};

const AccountTypeChooser: FunctionComponent<AccountTypeChooserProps> = ({ currentType, onTypeChange }) => {
    return (
        <div className="flex flex-col items-center gap-10 w-full">
            <p className="text-lg">Which of these define you better?</p>
            <div className="flex items-center gap-10">
                {AccountTypes.map((type) => {
                    const isCurrentType = currentType === type;
                    const isUnavailable = unavailableTypes.includes(type);

                    return (
                        <Card
                            key={type}
                            className={`flex flex-col justify-center items-center gap-8 w-52 aspect-square ${
                                isCurrentType && 'text-primary'
                            } ${isUnavailable ? 'opacity-50 cursor-not-allowed hover:shadow-md' : 'cursor-pointer'}`}
                            onClick={() => !isUnavailable && onTypeChange(type)}
                        >
                            {accountTypeIcons[type]}
                            <p className="text-2xl font-bold">{capitalize(type)}</p>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default AccountTypeChooser;
