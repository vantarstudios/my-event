import type { FunctionComponent } from 'react';
import { WithdrawalMethodType } from '@/types/constants';
import type { IconProps, WithdrawalMethod as TWithdrawalMethod } from '@/types';
import type { WithdrawalMethod } from '@/types';
import { Paypal, SimCard } from '@components/ui/icons';

export const withdrawalMethods: WithdrawalMethod[] = [
    {
        type: WithdrawalMethodType.MOBILE_MONEY,
        label: '+229 9***99',
    },
    {
        type: WithdrawalMethodType.PAYPAL,
        label: 'john***@example.com',
    }
];

export const withdrawalMethodsIcons: Record<TWithdrawalMethod['type'], FunctionComponent<IconProps>> = {
    [WithdrawalMethodType.PAYPAL]: Paypal,
    [WithdrawalMethodType.MOBILE_MONEY]: SimCard,
};
