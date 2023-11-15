import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const HoledDisk: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="currentColor"
            className={className}
        >
            <path d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z" />
            <path
                d="M35 25C35 30.5228 30.5228 35 25 35C19.4772 35 15 30.5228 15 25C15 19.4772 19.4772 15 25 15C30.5228 15 35 19.4772 35 25Z"
                fill="white"
            />
        </svg>
    );
};

export default HoledDisk;
