'use client';

import { useState, type FunctionComponent, type ChangeEvent } from 'react';
import { Button } from '@components/ui/buttons';
import { Input, PhoneNumberInput, TextArea } from '@components/ui/form';

const ContactForm: FunctionComponent = () => {
    const [data, setData] = useState({
        email: '',
        phone: '',
        organizationName: '',
        message: '',
    });
    
    const handleDataChange = (key: keyof typeof data) => <T extends HTMLInputElement | HTMLTextAreaElement>(event: ChangeEvent<T>) => {
        setData({
            ...data,
            [key]: event.target.value,
        });
    };
    
    return (
        <form
            className="flex flex-col gap-5"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-5">
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    labelClassName="font-bold"
                    value={data.email}
                    onChange={handleDataChange('email')}
                />
                <PhoneNumberInput
                    name="phone"
                    label="Phone number"
                    labelClassName="font-bold"
                    value={data.phone}
                    onChange={(value) => setData({
                        ...data,
                        phone: value,
                    })}
                />
                <Input
                    type="text"
                    name="organization-name"
                    label="Organization name"
                    labelClassName="font-bold"
                    value={data.organizationName}
                    onChange={handleDataChange('organizationName')}
                />
                <TextArea
                    name="message"
                    label="Message"
                    labelClassName="font-bold"
                    wrapperClassName="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1"
                    rows={6}
                    value={data.message}
                    onChange={handleDataChange('message')}
                />
            </div>
            <Button
                type="submit"
                className="font-light px-12 mt-6 mx-auto lg:mr-auto lg:ml-0"
            >
                Submit
            </Button>
        </form>
    );
};

export default ContactForm;
