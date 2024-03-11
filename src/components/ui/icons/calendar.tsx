import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const Calendar: FunctionComponent<IconProps> = ({ className, onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            fill="currentColor"
            className={className}
            onClick={onClick}
        >
            <path d="M26 5.57136C26 4.58627 25.6087 3.64152 24.9121 2.94496C24.2155 2.24839 23.2708 1.85706 22.2857 1.85706H21.3571V0.954606C21.3571 0.454917 20.9729 0.0260314 20.4733 0.00107597C20.3477 -0.00497323 20.2222 0.0145311 20.1044 0.0584072C19.9867 0.102283 19.879 0.169618 19.788 0.25633C19.697 0.343043 19.6246 0.447328 19.575 0.562866C19.5255 0.678405 19.5 0.802792 19.5 0.92849V1.85706H6.5V0.954606C6.5 0.454917 6.1158 0.0260314 5.61612 0.00107597C5.49056 -0.00497323 5.36509 0.0145311 5.2473 0.0584072C5.12951 0.102283 5.02185 0.169618 4.93085 0.25633C4.83986 0.343043 4.76741 0.447328 4.7179 0.562866C4.6684 0.678405 4.64287 0.802792 4.64286 0.92849V1.85706H3.71429C2.7292 1.85706 1.78445 2.24839 1.08789 2.94496C0.391325 3.64152 0 4.58627 0 5.57136V6.26779C0 6.32936 0.0244579 6.38841 0.0679931 6.43194C0.111528 6.47548 0.170575 6.49994 0.232143 6.49994H25.7679C25.8294 6.49994 25.8885 6.47548 25.932 6.43194C25.9755 6.38841 26 6.32936 26 6.26779V5.57136ZM0 22.2857C0 23.2708 0.391325 24.2155 1.08789 24.9121C1.78445 25.6087 2.7292 26 3.71429 26H22.2857C23.2708 26 24.2155 25.6087 24.9121 24.9121C25.6087 24.2155 26 23.2708 26 22.2857V8.58923C26 8.52766 25.9755 8.46861 25.932 8.42508C25.8885 8.38154 25.8294 8.35709 25.7679 8.35709H0.232143C0.170575 8.35709 0.111528 8.38154 0.0679931 8.42508C0.0244579 8.46861 0 8.52766 0 8.58923V22.2857Z" />
        </svg>
    );
};

export default Calendar;
