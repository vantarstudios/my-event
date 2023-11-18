import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

interface ChevronLeftProps extends IconProps {
    strokeWidth: 'thin' | 'regular' | 'bold';
}

const strokeWidthMap: Record<ChevronLeftProps['strokeWidth'], string> = {
    thin: '0.05',
    regular: '0',
    bold: '2',
};

const ChevronLeft: FunctionComponent<ChevronLeftProps> = ({ strokeWidth, className, onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="17"
            viewBox="0 0 11 17"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={strokeWidthMap[strokeWidth]}
            className={className}
            onClick={onClick}
        >
            <path d="M7.65715 15.4356L1.29319 9.07166C0.902667 8.68114 0.902667 8.04797 1.29319 7.65745L7.65715 1.29349C8.04768 0.902962 8.68084 0.902962 9.07137 1.29349C9.46189 1.68401 9.46189 2.31718 9.07137 2.7077L3.41451 8.36455L9.07136 14.0214C9.46189 14.4119 9.46189 15.0451 9.07136 15.4356C8.68084 15.8261 8.04768 15.8261 7.65715 15.4356Z" />
        </svg>
    );
};

export default ChevronLeft;
