import type { NextPage } from 'next';
import { PageContainer, OverlappingImages } from '@components/root';
import { ContactForm } from '@components/root/contact';

const ContactUsPage: NextPage = () => {
    return (
        <PageContainer>
            <div className="relative flex gap-52 w-full pl-20">
                <div className="flex flex-col gap-8 w-1/3">
                    <p className="text-5xl font-bold">
                        Contact us
                    </p>
                    <p>
                        We firmly believe that the key to success lies in transparent communication and a deep
                        understanding of our customers' needs. Whether you have questions, specific needs or simply want
                        to discuss your project, we are here to listen.
                    </p>
                    <ContactForm />
                </div>
                <OverlappingImages />
            </div>
        </PageContainer>
    )
};

export default ContactUsPage;
