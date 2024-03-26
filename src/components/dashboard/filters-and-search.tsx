'use client';

import type { FunctionComponent, ChangeEvent } from 'react';
import { Button } from '@components/ui/buttons';
import { Input } from '@components/ui/form';
import { Search } from '@components/ui/icons';

interface FiltersAndSearchProps {
    withSearch?: boolean;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
}

const FiltersAndSearch: FunctionComponent<FiltersAndSearchProps> = ({ withSearch = false, searchPlaceholder, searchValue, onSearch }) => {
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch?.(event.target.value);
    }
    return (
        <div className="flex flex-wrap justify-start items-center gap-x-5 gap-y-2.5 w-full text-sm">
            <Button className="px-8 bg-primary">All</Button>
            <Button className="px-8">This month</Button>
            <Button className="px-8">Last 30 days</Button>
            <Button className="px-8">Last trimester</Button>
            <Button className="px-8 bg-grey">Last year</Button>
            {
                withSearch && (
                    <Input
                        type="search"
                        name="search"
                        placeholder={searchPlaceholder}
                        className="pl-12 pr-5"
                        wrapperClassName="flex-1 w-full ml-20"
                        icon={<Search className="w-5 h-5 text-black"/>}
                        iconPosition="left"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                )
            }
        </div>
    );
};

export default FiltersAndSearch;
