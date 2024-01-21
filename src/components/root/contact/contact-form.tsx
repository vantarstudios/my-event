'use client';

import type { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@components/ui/buttons';
import { Input, PhoneNumberInput, TextArea } from '@components/ui/form';

const ContactForm: FunctionComponent = () => {
    const { register } = useForm();
    
    return (
        <form
            className="flex flex-col gap-5"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-5">
                <Input
                    register={register('email', {
                        required: true,
                    })}
                    type="email"
                    name="email"
                    label="Email"
                    labelClassName="font-bold"
                />
                <PhoneNumberInput
                    name="phone"
                    label="Phone number"
                    labelClassName="font-bold"
                />
                <Input
                    register={register('organizationName', {
                        required: true,
                    })}
                    type="text"
                    name="organization-name"
                    label="Organization name"
                    labelClassName="font-bold"
                />
                <TextArea
                    register={register('message', {
                        required: true,
                    })}
                    name="message"
                    label="Message"
                    labelClassName="font-bold"
                    wrapperClassName="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1"
                    rows={6}
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
