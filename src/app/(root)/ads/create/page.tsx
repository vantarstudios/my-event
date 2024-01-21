'use client';

import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/utils';
import type { EditOrCreateStep, Ad } from '@/types';
import { Stepper } from '@components/ui/form';
import { PageContainer } from '@components/root';
import { GeneralInformation, AdContent, AdOverview } from '@components/root/ads';

const AdCreatePage: NextPage = () => {
    const router = useRouter();
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [data, setData] = useState<Ad<File | null>>({
        description: '',
        images: [],
        businessOwner: {
            fullName: '',
            businessName: '',
            email: '',
            phoneNumber: '',
            location: '',
            logo: null,
        },
        ctaText: 'Contact',
        ctaLink: '',
    });
    
    const generalInformationIsCompleted = Object.values(data.businessOwner).every((value) => Boolean(value));
    const adContentIsCompleted = data.description.trim() !== '' && data.images.length > 0;
    const adOverviewIsCompleted = data.ctaText.trim() !== '' && data.ctaLink.trim() !== '';
    
    const steps: EditOrCreateStep[] = [
        {
            title: 'General Information',
            content: <GeneralInformation
                businessOwner={data.businessOwner}
                setBusinessOwner={(businessOwner) => setData({ ...data, businessOwner })}
                onContinue={generalInformationIsCompleted
                    ? () => setCurrentStepIndex(1)
                    : undefined
                }
            />,
            isCompleted: generalInformationIsCompleted
        },
        {
            title: 'Ad Content',
            content: <AdContent
                content={{ description: data.description, images: data.images }}
                setContent={(content) => setData({ ...data, ...content })}
                onContinue={adContentIsCompleted
                    ? () => setCurrentStepIndex(2)
                    : undefined
                }
            />,
            isCompleted: adContentIsCompleted
        },
        {
            title: 'Overview',
            content: <AdOverview
                details={{ ctaText: data.ctaText, ctaLink: data.ctaLink }}
                otherData={data as Ad<File>}
                setDetails={(details) => setData({ ...data, ...details })}
                onContinue={adOverviewIsCompleted
                    ? () => {
                        toast.success('Ad created successfully!');
                        router.push('/ads');
                    }
                    : undefined
                }
            />,
            isCompleted: data.ctaText.trim() !== '' && data.ctaLink.trim() !== ''
        }
    ];
    
    return (
        <PageContainer>
            <p className="mb-10 text-xl md:text-3xl xl:text-5xl font-bold">
                Running ad...
            </p>
            <div className="flex flex-col gap-y-10">
                <Stepper
                    steps={steps.map(({ title }) => title)}
                    currentStepIndex={currentStepIndex}
                    onStepClick={setCurrentStepIndex}
                    canGoToNextStep={steps[currentStepIndex]!.isCompleted}
                />
                {steps[currentStepIndex]!.content}
            </div>
        </PageContainer>
    );
};

export default AdCreatePage;

