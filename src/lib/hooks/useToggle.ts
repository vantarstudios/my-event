import { useState } from 'react';

export function useToggle<T>(first: T, second: T): [T, () => void] {
    const [value, setValue] = useState<T>(first);

    const toggleValue = () => {
        setValue((prev) => (prev === first ? second : first));
    };

    return [value, toggleValue];
}
