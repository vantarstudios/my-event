'use client';

import { type FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { upperSnakeCaseToSentenceCase, sentenceCaseToUpperSnakeCase } from '@/lib/utils';
import { type Ad, type AdDetails, AdRedirectionTypes } from '@/types';
import { Input, PhoneNumberInput, Select } from '@components/ui/form';
import { Button } from '@components/ui/buttons';

interface AdOverviewProps {
    details: AdDetails;
    otherData: Ad<File>,
    setDetails: (details: AdDetails) => void;
    onContinue?: () => void;
}

const formatCtaLink = (ctaLink: string, redirectionType: AdRedirectionTypes) => {
    switch (redirectionType) {
        case AdRedirectionTypes.EMAIL:
            return `mailto:${ctaLink}`;
        case AdRedirectionTypes.PHONE_NUMBER:
            return `tel:${ctaLink}`;
        default:
            return ctaLink;
    }
};

const AdOverview: FunctionComponent<AdOverviewProps> = ({ details, otherData, setDetails, onContinue }) => {
    const [redirectionType, setRedirectionType] = useState<AdRedirectionTypes>('' as AdRedirectionTypes);
    const { register, handleSubmit, formState: { errors } } = useForm<AdDetails>({
        defaultValues: details,
    });
    
    const ctaLinkRegister = register('ctaLink', {
        onChange: (event) => setDetails({
            ...details,
            ctaLink: event.target.value
        }),
    });
    
    const onSubmit = (data: AdDetails) => {
        setDetails({
            ...data,
            ctaLink: formatCtaLink(data.ctaLink.trim(), redirectionType)
        });
        onContinue && onContinue();
    };
    
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-start gap-y-5 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto"
        >
            <Select
                name="redirectType"
                label="Redirection type:"
                placeholder="Select redirection type"
                options={Object.values(AdRedirectionTypes).map((type) => upperSnakeCaseToSentenceCase(type))}
                value={upperSnakeCaseToSentenceCase(redirectionType)}
                onChange={(value) => {
                    setRedirectionType(
                        AdRedirectionTypes[sentenceCaseToUpperSnakeCase(value) as keyof typeof AdRedirectionTypes]
                    )
                }}
            />
            {
                redirectionType === AdRedirectionTypes.EMAIL && (
                    <Input
                        name="email"
                        type="email"
                        label="Email:"
                        register={ctaLinkRegister}
                        errors={errors.ctaLink?.message}
                    />
                )
            }
            {
                redirectionType === AdRedirectionTypes.LINK && (
                    <Input
                        name="link"
                        label="Link:"
                        register={ctaLinkRegister}
                        errors={errors.ctaLink?.message}
                    />
                )
            }
            {
                redirectionType === AdRedirectionTypes.PHONE_NUMBER && (
                    <PhoneNumberInput
                        name="phoneNumber"
                        label="Phone Number:"
                        value={details.ctaLink}
                        onChange={(phoneNumber) => setDetails({
                            ...details,
                            ctaLink: phoneNumber,
                        })}
                        errors={errors.ctaLink?.message}
                    />
                )
            }
            <Input
                name="ctaText"
                label="CTA (call to action) text:"
                register={register('ctaText', {
                    onChange: (event) => setDetails({
                        ...details,
                        ctaText: event.target.value
                    }),
                })}
                errors={errors.ctaText?.message}
            />
            <div className="flex flex-col items-start gap-1 w-full">
                <p className="font-semibold">Preview:</p>
                <div
                    title={otherData.description}
                    className="w-full h-60 border rounded-3xl overflow-hidden shadow-xl"
                >
                    <div className="flex justify-between items-center gap-3 w-full px-5 py-2 bg-white">
                        <div className="flex items-center gap-2 h-full">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                    src={URL.createObjectURL(otherData.businessOwner.logo!)}
                                    alt="Business owner logo"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            <div className="flex flex-col justify-between w-full h-full">
                                <p className="text-sm font-semibold">{otherData.businessOwner.businessName}</p>
                                <p className="text-sm line-clamp-1">
                                    {otherData.businessOwner.location}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={formatCtaLink(details.ctaLink, redirectionType)}
                            target="_blank"
                            className="w-fit focus:outline-none"
                        >
                            <Button className="px-5 text-sm rounded-xl">
                                {details.ctaText}
                            </Button>
                        </Link>
                    </div>
                    <div className="relative w-full h-4/5">
                        <Image
                            src={URL.createObjectURL(otherData.images[0]!)}
                            alt="Ad example"
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </div>
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

export default AdOverview;
