import type { FunctionComponent } from 'react';
import { PaymentMethod as PaymentMethodConstant } from '@/types/constants';
import type { IconProps, PaymentMethod as PaymentMethodType } from '@/types';
import { Button } from '@components/ui';
import { BankCard, Pencil, TrashCan } from '@components/ui/icons';

const paymentMethodIcons: Record<PaymentMethodType['type'], FunctionComponent<IconProps>> = {
    [PaymentMethodConstant.VISA]: BankCard,
    [PaymentMethodConstant.PAYPAL]: BankCard,
    [PaymentMethodConstant.MOBILE_MONEY]: BankCard,
};

interface PaymentMethodProps extends PaymentMethodType {}

const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({ type, label }) => {
    const PaymentMethodIcon = paymentMethodIcons[type] || BankCard;

    return (
        <div className="flex justify-between items-center w-full p-3 text-sm bg-gray-50">
            <div className="flex justify-center items-center gap-4 w-fit">
                <PaymentMethodIcon className="w-7 h-7" />
                <p>{label}</p>
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

export default PaymentMethod;
