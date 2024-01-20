import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const Menu: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="14"
            viewBox="0 0 22 14"
            fill="currentColor"
            className={className}
        >
            <path id="Vector (Stroke)" fillRule="evenodd" clipRule="evenodd"
                      d="M0 1.3125C0 0.587626 0.615608 0 1.375 0H20.625C21.3844 0 22 0.587626 22 1.3125C22 2.03737 21.3844 2.625 20.625 2.625H1.375C0.615608 2.625 0 2.03737 0 1.3125ZM0 7C0 6.27513 0.615608 5.6875 1.375 5.6875H20.625C21.3844 5.6875 22 6.27513 22 7C22 7.72487 21.3844 8.3125 20.625 8.3125H1.375C0.615608 8.3125 0 7.72487 0 7ZM0 12.6875C0 11.9626 0.615608 11.375 1.375 11.375H20.625C21.3844 11.375 22 11.9626 22 12.6875C22 13.4124 21.3844 14 20.625 14H1.375C0.615608 14 0 13.4124 0 12.6875Z"/>
        </svg>
    );
};

export default Menu;
