'use client';

import { useState, type FunctionComponent, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@components/ui/buttons';
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
            className="flex flex-col items-center gap-5 w-full"
        >
            <label
                htmlFor="email"
                className="w-full text-xl font-bold text-black"
            >
                E-mail
            </label>
            <Input
                type="email"
                name="email"
                placeholder="user@gmail.com"
                className="w-full h-12 text-lg"
                variant="auth"
                value={email}
                onChange={handleEmailChange}
            />
            <Button
                type="submit"
                className="w-full text-lg text-black font-medium border-2 border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white"
            >
                Subscribe
            </Button>
        </form>
    );
};

export default NewsletterForm;
