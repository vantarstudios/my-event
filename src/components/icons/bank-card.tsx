import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const BankCard: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="25"
            viewBox="0 0 32 25"
            fill="currentColor"
            className={className}
        >
            <path d="M0 21.0227C0 22.0776 0.421427 23.0892 1.17157 23.8351C1.92172 24.581 2.93913 25 4 25H28C29.0609 25 30.0783 24.581 30.8284 23.8351C31.5786 23.0892 32 22.0776 32 21.0227V10.0852H0V21.0227ZM4.71429 15.625C4.71429 15.0599 4.94005 14.518 5.34191 14.1184C5.74378 13.7188 6.28882 13.4943 6.85714 13.4943H10.2857C10.854 13.4943 11.3991 13.7188 11.8009 14.1184C12.2028 14.518 12.4286 15.0599 12.4286 15.625V17.0455C12.4286 17.6105 12.2028 18.1525 11.8009 18.5521C11.3991 18.9517 10.854 19.1761 10.2857 19.1761H6.85714C6.28882 19.1761 5.74378 18.9517 5.34191 18.5521C4.94005 18.1525 4.71429 17.6105 4.71429 17.0455V15.625ZM28 0H4C2.93913 0 1.92172 0.419033 1.17157 1.16492C0.421427 1.9108 0 2.92243 0 3.97727V5.82386H32V3.97727C32 2.92243 31.5786 1.9108 30.8284 1.16492C30.0783 0.419033 29.0609 0 28 0Z" />
        </svg>
    );
};

export default BankCard;
