import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const TrashCan: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="currentColor"
            className={className}
        >
            <path d="M19.1667 3H14.1667V1.875C14.1667 1.37772 13.9472 0.900805 13.5565 0.549175C13.1658 0.197544 12.6359 0 12.0833 0H7.91667C7.36413 0 6.83423 0.197544 6.44353 0.549175C6.05283 0.900805 5.83333 1.37772 5.83333 1.875V3H0.833333C0.61232 3 0.400358 3.07902 0.244078 3.21967C0.0877975 3.36032 0 3.55109 0 3.75C0 3.94891 0.0877975 4.13968 0.244078 4.28033C0.400358 4.42098 0.61232 4.5 0.833333 4.5H1.71875L2.70833 18.7931C2.78229 20.0517 3.85417 21 5.20833 21H14.7917C16.1526 21 17.2031 20.0728 17.2917 18.7969L18.2812 4.5H19.1667C19.3877 4.5 19.5996 4.42098 19.7559 4.28033C19.9122 4.13968 20 3.94891 20 3.75C20 3.55109 19.9122 3.36032 19.7559 3.21967C19.5996 3.07902 19.3877 3 19.1667 3ZM6.69635 18H6.66667C6.4507 18.0001 6.24312 17.9248 6.08766 17.7899C5.93221 17.6549 5.84103 17.471 5.83333 17.2767L5.41667 6.77672C5.40879 6.57781 5.48904 6.38423 5.63975 6.23856C5.79046 6.0929 5.9993 6.00709 6.22031 6C6.44133 5.99291 6.65642 6.06514 6.81826 6.20078C6.98011 6.33642 7.07546 6.52437 7.08333 6.72328L7.5 17.2233C7.50397 17.3218 7.48632 17.42 7.44807 17.5124C7.40982 17.6048 7.35171 17.6894 7.27707 17.7616C7.20244 17.8337 7.11273 17.8919 7.01308 17.9328C6.91344 17.9737 6.80581 17.9966 6.69635 18ZM10.8333 17.25C10.8333 17.4489 10.7455 17.6397 10.5893 17.7803C10.433 17.921 10.221 18 10 18C9.77899 18 9.56702 17.921 9.41074 17.7803C9.25446 17.6397 9.16667 17.4489 9.16667 17.25V6.75C9.16667 6.55109 9.25446 6.36032 9.41074 6.21967C9.56702 6.07902 9.77899 6 10 6C10.221 6 10.433 6.07902 10.5893 6.21967C10.7455 6.36032 10.8333 6.55109 10.8333 6.75V17.25ZM12.5 3H7.5V1.875C7.49937 1.8256 7.50972 1.77658 7.53044 1.73083C7.55115 1.68507 7.58182 1.64351 7.62064 1.60858C7.65946 1.57364 7.70564 1.54604 7.75647 1.52739C7.80731 1.50875 7.86177 1.49943 7.91667 1.5H12.0833C12.1382 1.49943 12.1927 1.50875 12.2435 1.52739C12.2944 1.54604 12.3405 1.57364 12.3794 1.60858C12.4182 1.64351 12.4488 1.68507 12.4696 1.73083C12.4903 1.77658 12.5006 1.8256 12.5 1.875V3ZM14.1667 17.2767C14.159 17.471 14.0678 17.6549 13.9123 17.7899C13.7569 17.9248 13.5493 18.0001 13.3333 18H13.3031C13.1937 17.9965 13.0861 17.9736 12.9866 17.9327C12.887 17.8917 12.7973 17.8335 12.7227 17.7614C12.6482 17.6893 12.5901 17.6046 12.5519 17.5123C12.5137 17.42 12.496 17.3217 12.5 17.2233L12.9167 6.72328C12.9206 6.62479 12.946 6.52795 12.9915 6.4383C13.0369 6.34865 13.1016 6.26794 13.1817 6.20078C13.2619 6.13361 13.3559 6.08132 13.4585 6.04687C13.5611 6.01242 13.6703 5.99649 13.7797 6C13.8891 6.00351 13.9967 6.02638 14.0963 6.06732C14.1959 6.10825 14.2856 6.16644 14.3602 6.23856C14.4349 6.31069 14.493 6.39534 14.5313 6.48767C14.5695 6.58001 14.5872 6.67823 14.5833 6.77672L14.1667 17.2767Z" />
        </svg>
    );
};

export default TrashCan;
