import type { FunctionComponent, HTMLAttributes } from 'react';
import { Cross } from '@components/ui/icons';

interface CategoryChipProps {
    category: string;
    deletable?: boolean;
    onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
    onDelete?: () => void;
}

const CategoryChip: FunctionComponent<CategoryChipProps> = ({ category, deletable, onClick, onDelete }) => {
    return (
        <div
            onClick={onClick}
            className="relative group flex justify-center items-center gap-1 w-fit h-fit px-2 py-2 rounded-full bg-gray-100 cursor-pointer transition-all hover:text-white hover:bg-black"
        >
            <p className="font-medium">#{category.toLowerCase()}</p>
            {
                deletable && (
                    <Cross
                        onClick={onDelete}
                        className="absolute -top-1 -right-1 w-4 h-4 p-0.5 rounded-full bg-red-500 hidden group-hover:block"
                    />
                )
            }
        </div>
    );
};

export default CategoryChip;
