'use client';

import { type ChangeEvent, type FunctionComponent, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@components/ui/buttons';
import { Picture, Cross } from '@components/ui/icons';

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
                (initialCover && !coverFile) && (
                    <Image
                        src={initialCover}
                        alt="Event cover image"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                        fill
                    />
                )
            }
            {
                coverFile
                    ? (
                        <Button
                            onClick={handleCoverImageClear}
                            className="absolute top-0 right-0 z-30 p-3 text-white rounded-none rounded-bl-xl drop-shadow-lg cursor-pointer bg-opacity-40 bg-primary hover:bg-opacity-100"
                        >
                            <Cross className="w-8 h-8"/>
                        </Button>
                    )
                    : (
                        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
                            <Picture className="w-1/2 aspect-square text-white"/>
                            <div
                                className="flex flex-col justify-center items-center gap-2.5 text-white child:w-2/3 child:text-center">
                                <p className="min-w-max font-medium">Upload event cover image</p>
                                <p className="text-sm">Cover image must have a specific size: 333 x 225 pixels.</p>
                            </div>
                        </div>
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
