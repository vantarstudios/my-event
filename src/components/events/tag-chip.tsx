import type { FunctionComponent, HTMLAttributes } from 'react';

interface TagChipProps {
    text: string;
    onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

const TagChip: FunctionComponent<TagChipProps> = ({ text, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex justify-center items-center gap-1 w-fit h-fit px-2 py-2 rounded-full bg-gray-100 cursor-pointer transition-all hover:text-white hover:bg-black"
        >
            <p className="text-xs font-medium">#{text.toLowerCase()}</p>
        </div>
    );
};

export default TagChip;
