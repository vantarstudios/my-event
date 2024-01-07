import type { FunctionComponent } from 'react';
import NewsletterForm from './newsletter-form';

const NewsletterSection: FunctionComponent = () => {
    return (
        <section className="relative flex justify-between items-center gap-[40vh] w-full px-[10vh]">
            <div className="flex flex-col gap-[2.5vh] w-1/2">
                <p className="text-5xl text-primary font-bold">
                    Newsletter
                </p>
                <p className="text-xl">
                    Stay updated on new features, plans and news by subscribing to our newsletter.
                </p>
            </div>
            <div className="flex justify-center w-1/2">
                <NewsletterForm/>
            </div>
        </section>
    );
};

export default NewsletterSection;
