import type { FunctionComponent, ReactNode, HTMLAttributes } from 'react';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
    name: HTMLInputElement['name'];
    checked: HTMLInputElement['checked'];
    label: ReactNode;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({ name, checked, label, onClick, ...props }) => {
    return (
        <div onClick={onClick} className="flex justify-center items-center gap-2 w-fit">
            <input
                {...props}
                type="checkbox"
                name={name}
                checked={checked}
                className="appearance-none w-4 aspect-square border border-black bg-white rounded-sm cursor-pointer transition-all checked:bg-black"
            />
            <label htmlFor={name} className="text-sm">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
