import type { FunctionComponent } from 'react';
import NewsletterForm from './newsletter-form';

const NewsletterSection: FunctionComponent = () => {
    return (
        <section className="relative flex flex-col md:flex-row justify-between items-center gap-5 md:gap-20 xl:gap-40 order w-full px-5 md:px-10 xl:px-20">
            <div className="flex flex-col gap-5 w-full md:w-1/2">
                <p className="text-center md:text-start text-3xl xl:text-5xl text-primary font-bold">
                    Newsletter
                </p>
                <p className="text-center md:text-start text-base lg:text-lg leading-[2.5vh] lg:leading-[3.5vh]">
                    Stay updated on new features, plans and news by subscribing to our newsletter.
                </p>
            </div>
            <div className="flex justify-center w-full md:w-1/2">
                <NewsletterForm/>
            </div>
        </section>
    );
};

export default NewsletterSection;
