import type { NextPage } from 'next';
import { PageContainer, OverlappingImages } from '@components/root';
import { ContactForm } from '@components/root/contact';

const ContactUsPage: NextPage = () => {
    return (
        <PageContainer>
            <div className="relative flex flex-col-reverse md:flex-col lg:flex-row gap-10 lg:gap-0 w-full md:pl-10 xl:pl-20">
                <div className="flex flex-col gap-8 lg:w-1/3">
                    <p className="text-center lg:text-start text-3xl md:text-4xl xl:text-5xl font-bold">
                        Contact us
                    </p>
                    <p className="text-center lg:text-start">
                        We firmly believe that the key to success lies in transparent communication and a deep
                        understanding of our customers' needs. Whether you have questions, specific needs or simply want
                        to discuss your project, we are here to listen.
                    </p>
                    <ContactForm />
                </div>
                <OverlappingImages className="lg:aspect-video"/>
            </div>
        </PageContainer>
    )
};

export default ContactUsPage;
