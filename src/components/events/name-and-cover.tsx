'use client';

import { useState } from 'react';
import type { FunctionComponent, ChangeEvent } from 'react';
import type { Event } from '@/types';
import { Button } from '@components/ui';
import { Input } from '@components/ui/form';
import { Picture, Cross } from '@components/ui/icons';
import { TitledTextArea, TitledArea } from '@components/ui/layouts';
import availableTags from '@/data/tags';

interface EditNameAndCoverProps extends Partial<Pick<Event, 'cover' | 'title' | 'description' | 'tags'>> {}

const buildTagsString = (tags: string[]) => {
    return tags.map((tag) => `#${tag}`).join(',');
};

const parseTagsString = (tags: string) => {
    return tags.split(',').map((tag) => tag.replace('#', ''));
};

const NameAndCover: FunctionComponent<EditNameAndCoverProps> = ({ cover, title, description, tags }) => {
    const [titleValue, setTitleValue] = useState<string>(title || '');
    const [descriptionValue, setDescriptionValue] = useState<string>(description || '');
    const [tagsValue, setTagsValue] = useState<string>(buildTagsString(tags || []));
    const [tagsList, setTagsList] = useState<string[]>(tags || []);
    const [coverFileURL, setCoverFileURL] = useState<string | null>(cover ? `/images/${cover}` : null);

    const suggestedTags = availableTags.filter((tag) => !tagsList.includes(tag));

    const handleSuggestedTagClick = (tag: string) => {
        setTagsList((currentTags) => {
            const newTags = [...currentTags, tag];
            setTagsValue(buildTagsString(newTags));
            return newTags;
        });
    };

    const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value) {
            setTagsValue(value);
            setTagsList(parseTagsString(value));
        }
    };

    const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];

        if (file) {
            setCoverFileURL(URL.createObjectURL(file));
        }
    };

    const handleCoverClear = () => {
        if (coverFileURL === null) {
            return;
        }

        URL.revokeObjectURL(coverFileURL);
        setCoverFileURL(null);
    };

    return (
        <div className="flex gap-5 w-full h-full pb-5 overflow-y-auto">
            <div
                style={{
                    backgroundImage: `url(${coverFileURL})`,
                }}
                className={`overflow-hidden relative w-1/3 min-h-full bg-cover bg-center rounded-3xl ${
                    coverFileURL === null && 'bg-black bg-opacity-60'
                }`}
            >
                {
                    coverFileURL !== null ? (
                        <Button
                            onClick={handleCoverClear}
                            className="absolute top-0 right-0 z-30 p-3 text-white rounded-none rounded-bl-xl drop-shadow-lg cursor-pointer bg-opacity-40 bg-primary hover:bg-opacity-100"
                        >
                            <Cross className="w-8 h-8"/>
                        </Button>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
                            <Picture className="w-1/2 aspect-square text-white"/>
                            <div
                                className="flex flex-col justify-center items-center gap-2.5 text-white child:w-2/3 child:text-center">
                                <p className="min-w-max font-medium">Upload event cover image</p>
                                <p className="text-xs">Cover image must have a specific size: 333 x 225 pixels.</p>
                            </div>
                        </div>
                    )
                }
                <input
                    type="file"
                    name="event-cover"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                />
            </div>
            <div className="flex flex-col justify-start gap-5 w-2/3 h-full pl-5">
                <TitledTextArea
                    title="Event title:"
                    value={titleValue}
                    placeholder="Enter your event title"
                    rows={1}
                    maxLength={150}
                    onChange={setTitleValue}
                    variant="edit"
                    className="text-xl font-bold placeholder:text-xl"
                />
                <TitledTextArea
                    title="Description:"
                    value={descriptionValue}
                    placeholder="Briefly describe your event to your participants"
                    maxLength={700}
                    rows={7}
                    onChange={setDescriptionValue}
                    variant="edit"
                />
                <TitledArea title="Category:">
                    <div className="flex flex-col items-start gap-5 w-full">
                        <div className="flex justify-start items-center gap-5 w-full">
                            <p className="text-sm">Suggestions:</p>
                            {suggestedTags.map((tag) => (
                                <Button
                                    key={tag}
                                    onClick={() => handleSuggestedTagClick(tag)}
                                    className="px-3 py-1.5 text-xs"
                                >
                                    #{tag}
                                </Button>
                            ))}
                        </div>
                        <Input
                            name="category"
                            value={tagsValue}
                            placeholder="Separate each category with a comma"
                            onChange={handleTagsChange}
                            variant="auth"
                            className="text-sm font-medium"
                            wrapperClassName="w-1/2"
                        />
                    </div>
                </TitledArea>
            </div>
        </div>
    );
};

export default NameAndCover;
