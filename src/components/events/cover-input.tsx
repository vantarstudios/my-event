'use client';

import { type ChangeEvent, type FunctionComponent, useMemo, useRef, useState, Fragment } from 'react';
import { ImageWithFallback } from '@components/ui';
import { Button } from '@components/ui/buttons';
import { Cross } from '@components/ui/icons';
import { ImageInputPlaceholder } from '@components/ui/form';

interface CoverInputProps {
    initialCover?: string;
    cover?: File;
    setCoverData: (cover: File | undefined) => void;
}

const CoverInput: FunctionComponent<CoverInputProps> = ({ initialCover, cover, setCoverData }) => {
    const [coverFile, setCoverFile] = useState<File | undefined>(cover);
    const coverFileInputRef = useRef<HTMLInputElement>(null);
    
    const handleCoverImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setCoverFile(file);
        setCoverData(file);
    };
    
    const handleCoverImageClear = () => {
        setCoverFile(undefined);
        setCoverData(undefined);
        coverFileInputRef.current?.value && (coverFileInputRef.current.value = '');
    };
    
    return useMemo(() => (
        <div
            style={{ backgroundImage: coverFile ? `url(${URL.createObjectURL(coverFile)})` : '' }}
            className={`overflow-hidden relative w-1/3 min-h-full bg-cover bg-center rounded-3xl ${
                (!coverFile && !initialCover) && 'bg-black bg-opacity-60'
            }`}
        >
            {
                !coverFile && (
                    <Fragment>
                        <ImageWithFallback
                            src={initialCover || ''}
                            alt="Event cover image"
                            quality={100}
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-opacity-40 bg-gray-500">
                            <ImageInputPlaceholder
                                message={
                                    initialCover
                                        ? 'Change event cover image'
                                        : 'Upload event cover image'
                                }
                            />
                        </div>
                    </Fragment>
                )
            }
            {
                coverFile && (
                    <Button
                        onClick={handleCoverImageClear}
                        className="absolute top-0 right-0 z-30 p-3 text-white rounded-none rounded-bl-xl drop-shadow-lg cursor-pointer bg-opacity-40 bg-primary hover:bg-opacity-100"
                    >
                        <Cross className="w-8 h-8"/>
                    </Button>
                )
            }
            <input
                ref={coverFileInputRef}
                type="file"
                name="event-cover"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
            />
        </div>
    ), [coverFile, initialCover]);
};

export default CoverInput;
