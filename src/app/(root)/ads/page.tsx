import type { NextPage } from 'next';
import Link from 'next/link';
import { PageContainer, OverlappingImages, SectionDivider } from '@components/root';
import { AdPricingCard } from '@components/root/ads';
import { Button } from '@components/ui/buttons';

const AdsPage: NextPage = () => {
    return (
        <PageContainer>
            <section className="relative flex gap-28 w-full">
                <div className="flex flex-col gap-7 w-1/2">
                    <p className="text-9xl leading-[9vh] font-bold">
                        The most effective environment to run your ads plans
                    </p>
                    <p className="text-xl leading-[4.5vh]">
                        Explore our advertising solution meticulously crafted to cater to your unique requirements.
                    </p>
                    <Link href="/ads/create" className="w-fit focus:outline-none">
                        <Button className="h-14 px-16 text-lg font-normal hover:bg-primary">
                            Run an ad
                        </Button>
                    </Link>
                </div>
                <OverlappingImages/>
            </section>
            <SectionDivider/>
            <section className="relative flex flex-col items-center gap-10 w-full">
                <p className="text-5xl text-primary font-bold">
                    Ads pricing plans
                </p>
                <p className="text-lg leading-[3.5vh] text-center">
                    Our array of advertising solutions is meticulously crafted to cater to your unique requirements.
                </p>
                <div className="flex justify-center items-start gap-10">
                    <AdPricingCard
                        duration="3 days"
                        price="$5"
                        description="Display your ads for 3 days on our mobile app and get the chance to reach to most of your target audience."
                    />
                    <AdPricingCard
                        duration="10 days"
                        price="$15"
                        description="Display your ads for 10 days on our mobile app and get the chance to reach to most of your target audience."
                    />
                    <AdPricingCard
                        duration="30 days"
                        price="$40"
                        description="Display your ads for 30 days on our mobile app and get the chance to reach to most of your target audience."
                    />
                </div>
            </section>
        </PageContainer>
    )
};

export default AdsPage;
