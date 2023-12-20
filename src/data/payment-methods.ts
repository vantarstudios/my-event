import type { PaymentMethod as PaymentMethodType } from '@/types';
import { PaymentMethod } from '@/types/constants';

const paymentMethods: PaymentMethodType[] = [
    {
        type: PaymentMethod.VISA,
        label: 'MasterCard ****0000',
    },
];

export default paymentMethods;
