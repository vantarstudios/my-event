'use client';

import { useState, type FunctionComponent, type ChangeEvent, type FormEvent } from 'react';
import { SecondaryButton } from '@components/ui/buttons';
import { Input } from '@components/ui/form';

const NewsletterForm: FunctionComponent = () => {
    const [email, setEmail] = useState('');
    
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3 md:gap-5 w-full"
        >
            <label
                htmlFor="email"
                className="text-center md:text-start w-full text-lg md:text-xl font-bold text-black"
            >
                E-mail
            </label>
            <Input
                type="email"
                name="email"
                placeholder="user@gmail.com"
                className="w-full h-12 text-base md:text-lg"
                variant="auth"
                value={email}
                onChange={handleEmailChange}
            />
            <SecondaryButton
                type="submit"
                className="w-full text-base md:text-lg"
            >
                Subscribe
            </SecondaryButton>
        </form>
    );
};

export default NewsletterForm;
