'use client';

import { useState } from 'react';
import type { FunctionComponent, ChangeEvent } from 'react';
import type { Event } from '@/types';
import { Button } from '@components/ui';
import { Input } from '@components/ui/form';
import { TitledTextArea, TitledArea } from '@components/ui/layouts';
import availableTags from '@/data/tags';

interface EditNameAndCoverProps extends Pick<Event, 'cover' | 'title' | 'description' | 'tags'> {}

const NameAndCover: FunctionComponent<EditNameAndCoverProps> = ({ cover, title, description, tags }) => {
    const [tagsList, setTagsList] = useState<string[]>(tags);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const suggestedTags = availableTags.filter((tag) => !tagsList.includes(tag));

    const handleSuggestedTagClick = (tag: string) => {
        setTagsList((currentTags) => [...currentTags, tag]);
    };

    const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];

        if (file) {
            setCoverFile(file);
        }
    };

    return (
        <div className="flex gap-5 w-full h-full pb-5">
            <div
                style={{
                    backgroundImage: `${
                        coverFile === null ? `url('/images/${cover}')` : `url(${URL.createObjectURL(coverFile)})`
                    }`,
                }}
                className="w-1/3 h-full bg-cover bg-center rounded-3xl"
            >
                <input
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="w-full h-full cursor-pointer opacity-0"
                />
            </div>
            <div className="flex flex-col justify-start gap-5 w-2/3 h-full pl-5">
                <TitledTextArea title="Event title:" value={title} maxLength={150} className="text-3xl font-bold" />
                <TitledTextArea title="Description:" value={description} maxLength={700} rows={7} />
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
                            value={tagsList.map((tag) => `#${tag}`).join(', ')}
                            className="text-sm font-medium"
                        />
                    </div>
                </TitledArea>
            </div>
        </div>
    );
};

export default NameAndCover;
