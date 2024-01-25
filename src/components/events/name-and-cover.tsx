import { useState, Fragment, type FunctionComponent, type ChangeEvent, type KeyboardEvent } from 'react';
import { upperSnakeCaseToSentenceCase } from '@/lib/utils';
import { EventCategory } from '@/types/constants';
import type { CreateEventPayload } from '@/types/events';
import type { EventCategoryUnion } from '@/types';
import CategoryChip from './category-chip';
import { Button } from '@components/ui/buttons';
import { TitledTextArea, TitledArea } from '@components/ui/layouts';
import { Input } from '@components/ui/form';
import { Search } from '@components/ui/icons';
import CoverInput from './cover-input';

type NameAndCoverProps = Partial<Pick<CreateEventPayload, 'cover' | 'title' | 'description' | 'categories'>>

interface EditNameAndCoverProps extends NameAndCoverProps {
    initialCover?: string;
    setOtherData: <T extends keyof CreateEventPayload>(key: T) => (value: CreateEventPayload[T]) => void;
}

const NameAndCover: FunctionComponent<EditNameAndCoverProps> = ({ title, cover, description, categories, initialCover, setOtherData }) => {
    const [searchedCategory, setSearchedCategory] = useState('');
    
    const suggestedCategories = categories && categories.length > 0
        ? Object.values(EventCategory).filter((category) => !categories.includes(category))
        : Object.values(EventCategory);
    
    const matchingCategories = searchedCategory.length > 0
        ? suggestedCategories.filter((category) => category.toLowerCase().includes(searchedCategory.toLowerCase()))
        : [];
    
    const handleCategorySearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchedCategory(event.target.value);
    };
    
    const handleCategorySearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (matchingCategories.length > 0) {
                setOtherData('categories')([...(categories || []), matchingCategories[0] as EventCategoryUnion]);
            }
            setSearchedCategory('');
        }
    };

    const handleSuggestedCategoryClick = (category: EventCategoryUnion) => () => {
        setOtherData('categories')([...(categories || []), category]);
    };
    
    const handleCategoryDelete = (deletedCategory: EventCategoryUnion) => () => {
        setOtherData('categories')((categories || []).filter((category) => category !== deletedCategory));
    };

    return (
        <div className="flex gap-5 w-full flex-1">
            <CoverInput
                initialCover={initialCover}
                cover={cover}
                setCoverData={setOtherData('cover')}
            />
            <div className="flex flex-col justify-start gap-5 w-2/3 h-full px-5">
                <TitledTextArea
                    title="Event title:"
                    value={title}
                    onChange={(value) => setOtherData('title')(value)}
                    placeholder="Enter your event title"
                    rows={1}
                    maxLength={150}
                />
                <TitledTextArea
                    value={description}
                    onChange={(value) => setOtherData('description')(value)}
                    title="Description:"
                    placeholder="Briefly describe your event to your participants"
                    maxLength={700}
                    rows={7}
                    className="py-5"
                />
                <TitledArea title="Category:">
                    <div className="flex flex-col items-start gap-5 w-full">
                        <div className="flex gap-5 w-full">
                            <div className="relative w-1/3">
                                <Input
                                    type="search"
                                    name="search-category"
                                    placeholder="Search a category"
                                    className="pl-10 pr-5"
                                    icon={<Search className="w-5 h-5 text-black"/>}
                                    iconPosition="left"
                                    value={searchedCategory}
                                    onChange={handleCategorySearch}
                                    onKeyDown={handleCategorySearchKeyDown}
                                />
                                {
                                    searchedCategory.length > 0 && (
                                        <ul className="absolute bottom-full left-0 w-full max-h-40 mb-2 bg-white rounded-xl shadow-md overflow-y-auto">
                                            {
                                                matchingCategories.length === 0
                                                    ? (
                                                        <li className="text-sm w-full min-w-max h-10 px-5 py-2.5 cursor-pointer hover:bg-gray-100 transition-all">
                                                            No matching categories
                                                        </li>
                                                    ) : (
                                                        matchingCategories.map((category) => (
                                                            <li
                                                                key={category}
                                                                onClick={handleSuggestedCategoryClick(category)}
                                                                className="w-full h-10 px-5 py-2.5 cursor-pointer hover:bg-gray-100 transition-all"
                                                            >
                                                                {upperSnakeCaseToSentenceCase(category)}
                                                            </li>
                                                        ))
                                                    )
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                            <div
                                className="flex flex-nowrap justify-start items-center gap-1 w-2/3 min-h-[3rem] px-3 rounded-xl bg-gray-100 overflow-x-auto">
                                {
                                    (!categories || categories.length === 0) && (
                                        <p className="text-gray-500">No category selected</p>
                                    )
                                }
                                {
                                    categories && categories.map((category, index) => (
                                        <Fragment key={category}>
                                            <CategoryChip
                                                category={category}
                                                onDelete={handleCategoryDelete(category)}
                                                deletable
                                                fontSize="sm"
                                            />
                                            {index < categories.length - 1 && <span>-</span>}
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-start items-center gap-x-5 gap-y-2.5 w-full">
                            <p>Suggestions: </p>
                            {suggestedCategories.slice(0, 4).map((category) => (
                                <Button
                                    key={category}
                                    onClick={handleSuggestedCategoryClick(category)}
                                    className="flex items-center min-w-max px-3 h-8 text-sm"
                                >
                                    {upperSnakeCaseToSentenceCase(category)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </TitledArea>
            </div>
        </div>
    );
};

export default NameAndCover;
