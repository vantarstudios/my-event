import type { FunctionComponent } from 'react';
import type { IconProps, PaymentMethod as PaymentMethodType } from '@/types';
import { Button } from '@/components/common';
import { BankCard, Pencil, TrashCan } from '@/components/icons';

const paymentMethodIcons: Record<PaymentMethodType, FunctionComponent<IconProps>> = {
    card: BankCard,
    paypal: BankCard,
};

interface PaymentMethodProps {
    type: PaymentMethodType;
    label: string;
}

const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({ type, label }) => {
    return (
        <div className="flex justify-between items-center w-full text-lg">
            <div className="flex items-center gap-4 w-fit">
                {paymentMethodIcons[type]({ className: 'w-8 h-8' })}
                <p>{label}</p>
            </div>
            <div className="flex gap-8 w-fit">
                <Button className="flex items-center gap-2 w-fit text-black bg-inherit hover:underline">
                    <Pencil className="w-4 h-4" />
                    Edit
                </Button>
                <Button className="flex items-center gap-2 w-fit text-black bg-inherit hover:underline">
                    <TrashCan className="w-4 h-4" />
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default PaymentMethod;
