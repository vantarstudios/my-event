'use client';

import type { FunctionComponent } from 'react';
import { Button } from '@components/ui';
import { Input, TextArea } from '@components/ui/form';

const ContactForm: FunctionComponent = () => {
    return (
        <form
            className="flex flex-col gap-5"
        >
            <Input
                type="email"
                name="email"
                label="Email"
                labelClassName="font-bold"
            />
            <Input
                type="number"
                name="phone"
                label="Phone number"
                labelClassName="font-bold"
            />
            <Input
                type="text"
                name="organization-name"
                label="Organization name"
                labelClassName="font-bold"
            />
            <TextArea
                name="message"
                label="Message"
                labelClassName="font-bold"
                rows={6}
            />
            <Button
                type="submit"
                className="font-light px-12 mt-6"
            >
                Submit
            </Button>
        </form>
    );
};

export default ContactForm;
