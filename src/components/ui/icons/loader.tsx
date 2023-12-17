import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const Loader: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            fill="currentColor"
            stroke="currentColor"
            className={className}
        >
            <path
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            />
        </svg>
    );
};

export default Loader;
