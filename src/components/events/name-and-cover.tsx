import { useState, Fragment, type FunctionComponent, type ChangeEvent, type KeyboardEvent } from 'react';
import { upperSnakeCaseToSentenceCase } from '@/lib/utils';
import { EventFormat, EventTheme } from '@/types/constants';
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
    const [searchedFormat, setSearchedFormat] = useState('');
    const [searchedTheme, setSearchedTheme] = useState('');
    
    const selectedFormats: EventFormat[] = [];
    const selectedThemes: EventTheme[] = [];
    
    const suggestedFormats = categories && categories.length > 0
        ? Object.values(EventFormat).filter((format) => {
            if (categories.includes(format)) {
                selectedFormats.push(format);
                return false;
            }
            return true;
        })
        : Object.values(EventFormat);
    const suggestedThemes = categories && categories.length > 0
        ? Object.values(EventTheme).filter((theme) => {
            if (categories.includes(theme)) {
                selectedThemes.push(theme);
                return false;
            }
            return true;
        
        })
        : Object.values(EventTheme);
    
    const matchingFormats = searchedFormat.length > 0
        ? suggestedFormats.filter((format) => format.toLowerCase().includes(searchedFormat.toLowerCase()))
        : [];
    const matchingThemes = searchedTheme.length > 0
        ? suggestedThemes.filter((theme) => theme.toLowerCase().includes(searchedTheme.toLowerCase()))
        : [];
    
    const handleFormatSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchedFormat(event.target.value);
    };
    const handleThemeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchedTheme(event.target.value);
    };
    
    const handleFormatSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (matchingFormats.length > 0) {
                setOtherData('categories')([...(categories || []), matchingFormats[0] as EventCategoryUnion]);
            }
            setSearchedFormat('');
        }
    };
    const handleThemeSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (matchingThemes.length > 0) {
                setOtherData('categories')([...(categories || []), matchingThemes[0] as EventCategoryUnion]);
            }
            setSearchedTheme('');
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
                <TitledArea title="Format:" className="relative">
                    <div className="flex gap-5 w-full">
                        <div className="relative w-1/3">
                            <Input
                                type="search"
                                name="search-category"
                                placeholder="Search a format"
                                className="pl-12 pr-5"
                                icon={<Search className="w-5 h-5 text-black"/>}
                                iconPosition="left"
                                disabled={searchedTheme.length > 0}
                                value={searchedFormat}
                                onChange={handleFormatSearch}
                                onKeyDown={handleFormatSearchKeyDown}
                            />
                            {
                                searchedFormat.length > 0 && (
                                    <ul className="absolute bottom-full left-0 w-full max-h-40 mb-2 bg-white rounded-xl shadow-md overflow-y-auto">
                                        {
                                            matchingFormats.length === 0
                                                ? (
                                                    <li className="text-sm w-full min-w-max h-10 px-5 py-2.5 cursor-pointer hover:bg-gray-100 transition-all">
                                                        No matching formats
                                                    </li>
                                                ) : (
                                                    matchingFormats.map((format) => (
                                                        <li
                                                            key={format}
                                                            onClick={handleSuggestedCategoryClick(format)}
                                                            className="w-full h-10 px-5 py-2.5 cursor-pointer hover:bg-gray-100 transition-all"
                                                        >
                                                            {upperSnakeCaseToSentenceCase(format)}
                                                        </li>
                                                    ))
                                                )
                                        }
                                    </ul>
                                )
                            }
                        </div>
                        <div className="flex flex-nowrap justify-start items-center gap-1 w-2/3 min-h-[3rem] px-3 rounded-xl bg-gray-100 overflow-x-auto">
                            {
                                (!selectedFormats || selectedFormats.length === 0) && (
                                    <p className="text-gray-500">No format selected</p>
                                )
                            }
                            {
                                selectedFormats && selectedFormats.map((format, index) => (
                                    <Fragment key={format}>
                                        <CategoryChip
                                            category={format}
                                            onDelete={handleCategoryDelete(format)}
                                            deletable
                                            fontSize="sm"
                                        />
                                        {index < selectedFormats.length - 1 && <span>-</span>}
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                </TitledArea>
                <TitledArea title="Themes:">
                    <div className="flex flex-col items-start gap-5 w-full">
                        <div className="flex gap-5 w-full">
                            <div className="relative w-1/3">
                                <Input
                                    type="search"
                                    name="search-category"
                                    placeholder="Search a theme"
                                    className="pl-12 pr-5"
                                    icon={<Search className="w-5 h-5 text-black"/>}
                                    iconPosition="left"
                                    disabled={searchedFormat.length > 0}
                                    value={searchedTheme}
                                    onChange={handleThemeSearch}
                                    onKeyDown={handleThemeSearchKeyDown}
                                />
                                {
                                    searchedTheme.length > 0 && (
                                        <ul className="absolute bottom-full left-0 w-full max-h-40 mb-2 bg-white rounded-xl shadow-md overflow-y-auto">
                                            {
                                                matchingThemes.length === 0
                                                    ? (
                                                        <li className="text-sm w-full min-w-max h-10 px-5 py-2.5 cursor-pointer hover:bg-gray-100 transition-all">
                                                            No matching themes
                                                        </li>
                                                    ) : (
                                                        matchingThemes.map((theme) => (
                                                            <li
                                                                key={theme}
                                                                onClick={handleSuggestedCategoryClick(theme)}
                                                                className="w-full h-10 px-5 py-2.5 cursor-pointer hover:bg-gray-100 transition-all"
                                                            >
                                                                {upperSnakeCaseToSentenceCase(theme)}
                                                            </li>
                                                        ))
                                                    )
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                            <div className="flex flex-nowrap justify-start items-center gap-1 w-2/3 min-h-[3rem] px-3 rounded-xl bg-gray-100 overflow-x-auto">
                                {
                                    (!selectedThemes || selectedThemes.length === 0) && (
                                        <p className="text-gray-500">No theme selected</p>
                                    )
                                }
                                {
                                    selectedThemes && selectedThemes.map((theme, index) => (
                                        <Fragment key={theme}>
                                            <CategoryChip
                                                category={theme}
                                                onDelete={handleCategoryDelete(theme)}
                                                deletable
                                                fontSize="sm"
                                            />
                                            {index < selectedThemes.length - 1 && <span>-</span>}
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-start items-center gap-x-5 gap-y-2.5 w-full">
                            <p>Suggestions: </p>
                            {suggestedThemes.slice(0, 4).map((theme) => (
                                <Button
                                    key={theme}
                                    onClick={handleSuggestedCategoryClick(theme)}
                                    className="flex items-center min-w-max px-3 h-8 text-sm"
                                >
                                    {upperSnakeCaseToSentenceCase(theme)}
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
