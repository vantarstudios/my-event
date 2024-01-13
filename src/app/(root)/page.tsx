import type { NextPage } from 'next';
import { PageContainer, SectionDivider } from '@components/root';
import {
    HeroSection,
    EventsSection,
    AppsIntegrationSection,
    FreeSection,
    NewsletterSection
} from '@components/root/home';

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
