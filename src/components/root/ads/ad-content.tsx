'use client';

import { useState, type FunctionComponent, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import type { AdContent } from '@/types';
import { TextArea, InputWrapper, ImageInputPlaceholder } from '@components/ui/form';
import { Cross } from '@components/ui/icons';
import { Button } from '@components/ui/buttons';

interface AdContentProps {
    content: AdContent<File | null>;
    setContent: (content: AdContent<File | null>) => void;
    onContinue?: () => void;
}

const AdContentProps: FunctionComponent<AdContentProps> = ({ content, setContent, onContinue }) => {
    const [images, setImages] = useState<(File | null)[]>(content.images);
    const { register, handleSubmit, formState: { errors } } = useForm<AdContent<File | null>>({
        defaultValues: content,
    });
    
    const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = [] as (File | null)[];
        
        for (let i = 0; i < event.target.files!.length; i++) {
            files.push(event.target.files![i] as (File | null));
        }
        
        setImages([...images, ...files]);
        setContent({
            ...content,
            images: [...images, ...files],
        });
    };
    
    const handleImageRemove = (index: number) => () => {
        const newImages = images.filter((_, i) => i !== index);
        
        setImages(newImages);
        setContent({ ...content, images: newImages });
    };
    
    return (
        <form
            onSubmit={handleSubmit((data) => {
                setContent({ ...data, images });
                onContinue && onContinue();
            })}
            className="flex flex-col justify-center items-start gap-y-5 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto"
        >
            <TextArea
                name="description"
                label="Description:"
                rows={5}
                register={{
                    ...register('description', {
                        onChange: (event) => setContent({
                            ...content,
                            description: event.target.value
                        }),
                    })
                }}
                errors={errors.description?.message}
            />
            <InputWrapper
                name="images"
                label="Image(s):"
                errors={errors.images?.message}
            >
                <div className="relative flex justify-center items-center w-full h-52 bg-gray-500 rounded-3xl overflow-hidden">
                    <ImageInputPlaceholder
                        message="Upload images"
                        subMessage="Drag and drop or click to upload"
                    />
                    <input
                        id="ad-images"
                        type="file"
                        accept="image/*"
                        multiple
                        {...register('images', {
                            onChange: handleImagesChange,
                        })}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </InputWrapper>
            {
                images.length > 0 && (
                    <div className="grid grid-cols-4 gap-5 w-full">
                        {
                            images.map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative"
                                >
                                    <div
                                        className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-lg">
                                        <Image
                                            src={URL.createObjectURL(image!)}
                                            alt={`Ad image ${index + 1}`}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>
                                    <Cross
                                        className="hidden group-hover:block absolute -top-2 -right-2 p-1 text-white rounded-full cursor-pointer bg-black hover:bg-red-500"
                                        onClick={handleImageRemove(index)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <Button
                type="submit"
                disabled={!onContinue}
                className="w-full mt-5"
            >
                Continue
            </Button>
        </form>
    );
};

export default AdContentProps;
