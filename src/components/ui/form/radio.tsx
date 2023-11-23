import type { FunctionComponent, ChangeEvent } from 'react';

interface RadioProps {
    name: string;
    label?: string;
    value?: string;
    checked?: boolean;
    onChange?: (value: string) => void;
}

const Radio: FunctionComponent<RadioProps> = ({ name, label, value, checked, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={handleChange}
                className="form-radio w-6 h-6 bg-white hover:bg-black focus:bg-primary checked:bg-primary checked:hover:bg-primary checked:focus:bg-primary checked:focus:ring-black cursor-pointer"
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default Radio;
