import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const Dots: FunctionComponent<IconProps> = ({ className, onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="25"
            viewBox="0 0 40 25"
            fill="currentColor"
            className={className}
            onClick={onClick}
        >
            <path
                d="M20 15C21.2745 15 22.3077 13.8807 22.3077 12.5C22.3077 11.1193 21.2745 10 20 10C18.7255 10 17.6923 11.1193 17.6923 12.5C17.6923 13.8807 18.7255 15 20 15Z"/>
            <path
                d="M27.6923 15C28.9668 15 30 13.8807 30 12.5C30 11.1193 28.9668 10 27.6923 10C26.4178 10 25.3846 11.1193 25.3846 12.5C25.3846 13.8807 26.4178 15 27.6923 15Z"/>
            <path
                d="M12.3077 15C13.5822 15 14.6154 13.8807 14.6154 12.5C14.6154 11.1193 13.5822 10 12.3077 10C11.0332 10 10 11.1193 10 12.5C10 13.8807 11.0332 15 12.3077 15Z"/>
        </svg>
    );
};

export default Dots;
