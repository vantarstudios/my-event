import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const Cross: FunctionComponent<IconProps> = ({ className, onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            stroke="currentColor"
            onClick={onClick}
            strokeWidth="2"
            className={`react-date-picker__clear-button__icon react-date-picker__button__icon ${className}`}
        >
            <line x1="4" x2="15" y1="4" y2="15"></line>
            <line x1="15" x2="4" y1="4" y2="15"></line>
        </svg>
    );
};

export default Cross;
