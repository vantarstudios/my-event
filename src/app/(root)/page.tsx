import type { NextPage } from 'next';
import { PageContainer } from '@components/root';
import {
    HeroSection,
    EventsSection,
    AppsIntegrationSection,
    FreeSection,
    NewsletterSection
} from '@components/home';
import { SectionDivider } from '@components/ui';

const HomePage: NextPage = () => {
    return (
        <PageContainer>
            <HeroSection/>
            <SectionDivider/>
            <EventsSection/>
            <SectionDivider/>
            <AppsIntegrationSection/>
            <SectionDivider/>
            <FreeSection/>
            <SectionDivider/>
            <NewsletterSection/>
        </PageContainer>
    )
};

export default HomePage;
