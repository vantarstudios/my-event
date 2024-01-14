'use client';

import { useState, type FunctionComponent, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import type { AdBusinessOwner } from '@/types';
import { Input, LocationInput, PhoneNumberInput } from '@components/ui/form';
import { Photo } from '@components/ui/icons';
import { Button } from '@components/ui/buttons';

interface GeneralInformationProps {
    businessOwner: AdBusinessOwner<File | null>;
    setBusinessOwner: (businessOwner: AdBusinessOwner<File | null>) => void;
    onContinue?: () => void;
}

const GeneralInformation: FunctionComponent<GeneralInformationProps> = ({ businessOwner, setBusinessOwner, onContinue }) => {
    const [logo, setLogo] = useState<File | null>(businessOwner.logo);
    const { register, handleSubmit, formState: { errors } } = useForm<AdBusinessOwner<File | null>>({
        defaultValues: businessOwner,
    });
    
    const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        
        if (file) {
            setLogo(file);
            setBusinessOwner({
                ...businessOwner,
                logo: file,
            });
        }
    };
    
    return (
        <form
            onSubmit={handleSubmit((data) => {
                setBusinessOwner({ ...data, logo });
                onContinue && onContinue();
            })}
            className="flex flex-col justify-center items-start gap-y-5 w-1/4 mx-auto"
        >
            <div className="flex flex-col items-center gap-y-5 w-full">
                <div className="relative flex justify-center items-center w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
                    {
                        logo
                            ? (
                                <Image
                                    src={URL.createObjectURL(logo)}
                                    alt="Business owner logo"
                                    fill
                                    className="object-cover object-center"
                                />
                            )
                            : (
                                <Photo className="w-[40%] h-[40%]"/>
                            )
                    }
                    <input
                        type="file"
                        accept="image/*"
                        {...register('logo', {
                            onChange: handleLogoChange,
                        })}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <p className="font-medium">Add your logo or photo</p>
            </div>
            <Input
                name="fullName"
                label="Full Name:"
                register={{
                    ...register('fullName', {
                        onChange: (event) => setBusinessOwner({
                            ...businessOwner,
                            fullName: event.target.value
                        }),
                    })
                }}
                errors={errors.fullName?.message}
            />
            <Input
                name="businessName"
                label="Business Name:"
                register={{
                    ...register('businessName', {
                        onChange: (event) => setBusinessOwner({
                            ...businessOwner,
                            businessName: event.target.value
                        }),
                    })
                }}
                errors={errors.businessName?.message}
            />
            <LocationInput
                name="location"
                label="Location:"
                enableMap={false}
                iconClassName="top-auto"
                register={{
                    ...register('location', {
                        onChange: (event) => setBusinessOwner({
                            ...businessOwner,
                            location: event.target.value
                        }),
                    })
                }}
                errors={errors.location?.message}
            />
            <Input
                name="email"
                type="email"
                label="Email:"
                register={{
                    ...register('email', {
                        onChange: (event) => setBusinessOwner({
                            ...businessOwner,
                            email: event.target.value
                        }),
                    })
                }}
                errors={errors.email?.message}
            />
            <PhoneNumberInput
                name="phoneNumber"
                label="Phone Number:"
                value={businessOwner.phoneNumber}
                onChange={(phoneNumber) => setBusinessOwner({
                    ...businessOwner,
                    phoneNumber,
                })}
                errors={errors.phoneNumber?.message}
            />
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

export default GeneralInformation;
