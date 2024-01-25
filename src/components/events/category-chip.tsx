import type { FunctionComponent, HTMLAttributes } from 'react';
import { upperSnakeCaseToSentenceCase } from '@/lib/utils';
import { Cross } from '@components/ui/icons';

interface CategoryChipProps {
    category: string;
    deletable?: boolean;
    onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
    onDelete?: () => void;
    fontSize?: 'sm' | 'base';
}

const CategoryChip: FunctionComponent<CategoryChipProps> = ({ category, deletable, onClick, onDelete, fontSize }) => {
    return (
        <div
            onClick={onClick}
            className={`relative group flex justify-center items-center gap-1 w-fit h-fit px-2 rounded-full bg-gray-100 cursor-pointer transition-all hover:text-white hover:bg-black ${
                fontSize === 'sm' ? 'py-1' : 'py-2'
            }`}
        >
            <p className={`min-w-max font-medium ${fontSize === 'sm' ? 'text-sm' : 'text-base'}`}>
                {upperSnakeCaseToSentenceCase(category)}
            </p>
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
