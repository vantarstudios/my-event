import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const Pencil: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="currentColor"
            className={className}
        >
            <path d="M18.2745 0.148002C18.5104 0.0502921 18.7632 0 19.0185 0C19.2739 0 19.5267 0.0502921 19.7625 0.148002C19.9984 0.245711 20.2127 0.388925 20.3933 0.569471L20.4311 0.607287L20.4314 0.607579C20.7956 0.972114 21.0003 1.46637 21.0003 1.9817C21.0003 2.49704 20.7956 2.9913 20.4314 3.35583L20.4311 3.35612L19.8359 3.95129C19.4022 4.385 18.699 4.385 18.2653 3.95129L17.0487 2.7347C16.8404 2.52637 16.7234 2.24379 16.7234 1.94916C16.7235 1.65453 16.8406 1.37201 17.049 1.16376L17.6438 0.569471C17.8244 0.388929 18.0387 0.245713 18.2745 0.148002ZM15.6798 2.99234C15.9746 2.99216 16.2573 3.10918 16.4658 3.31762L17.6824 4.53422C17.8908 4.74266 18.0078 5.02542 18.0077 5.3202C18.0075 5.61498 17.8901 5.8976 17.6814 6.10578L3.91016 19.8432C3.80697 19.9461 3.68454 20.0278 3.54983 20.0834L1.53462 20.9158C1.11982 21.0872 0.642663 20.992 0.325315 20.6747C0.00796781 20.3573 -0.087186 19.8802 0.0841583 19.4654L0.916592 17.4502C0.972237 17.3155 1.05385 17.193 1.15678 17.0898L14.8942 3.31859C15.1024 3.10989 15.385 2.99252 15.6798 2.99234Z" />
        </svg>
    );
};

export default Pencil;
