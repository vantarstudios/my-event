import type { NextPage } from 'next';
import Link from 'next/link';
import { PageContainer, OverlappingImages, SectionDivider } from '@components/root';
import { AdPricingCard } from '@components/root/ads';
import { PrimaryButton } from '@components/ui/buttons';

const AdsPage: NextPage = () => {
    return (
        <PageContainer>
            <section className="relative flex flex-col-reverse lg:flex-row w-full gap-5">
                <div className="flex flex-col items-center lg:items-start gap-7 w-full lg:w-1/2">
                    <p className="text-4xl md:text-5xl xl:text-6xl font-bold">
                        The most effective environment to run your ads plans
                    </p>
                    <p className="text-center lg:text-start md:text-lg lg:text-xl lg:leading-[4.5vh]">
                        Explore our advertising solution meticulously crafted to cater to your unique requirements.
                    </p>
                    <Link href="/ads/create" className="w-fit focus:outline-none">
                        <PrimaryButton className="px-10 py-4 md:px-16 rounded-full lg:text-lg font-normal">
                            Run an ad
                        </PrimaryButton>
                    </Link>
                </div>
                <OverlappingImages/>
            </section>
            <SectionDivider className="lg:mt-28"/>
            <section className="relative flex flex-col items-center gap-5 lg:gap-10 w-full">
                <p className="text-center lg:text-start text-xl md:text-3xl xl:text-5xl text-primary font-bold">
                    Ads pricing plans
                </p>
                <p className="lg:text-lg lg:leading-[3.5vh] text-center">
                    Our array of advertising solutions is meticulously crafted to cater to your unique requirements.
                </p>
                <div className="flex flex-wrap justify-center items-start gap-10">
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
