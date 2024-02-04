'use client';

import { useState, type FunctionComponent, type ChangeEvent, type FormEvent } from 'react';
import { useMutationRequest, useUserProfile } from '@/lib/hooks';
import { toast } from '@/lib/utils';
import { supportAPI } from '@/lib/api/support';
import { supportPayloadSchema, type SupportPayload } from '@/types/support';
import { Button } from '@components/ui/buttons';
import { Input, PhoneNumberInput, TextArea } from '@components/ui/form';

const ContactForm: FunctionComponent = () => {
    const { user } = useUserProfile();
    const initialData: SupportPayload = {
        email: user?.data.email || '',
        phone: user?.data.phoneNumber || '',
        organizationName: '',
        message: '',
    };
    const [data, setData] = useState<SupportPayload>(initialData);
    
    const { trigger, isMutating } = useMutationRequest(
        `contact-form-submission`,
        async (_: string, { arg: payload }: { arg: SupportPayload }) => {
            const response = await supportAPI.requestSupport(payload);
            return response.data;
        },
        'Your message has been sent successfully!',
    );
    
    const handleDataChange = (key: keyof typeof data) => <T extends HTMLInputElement | HTMLTextAreaElement>(event: ChangeEvent<T>) => {
        setData({
            ...data,
            [key]: event.target.value,
        });
    };
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (isMutating) return;
        
        const validationResults = supportPayloadSchema.safeParse(data);
        
        if (!validationResults.success) {
            toast.error('Please fill in all the required fields.');
            return;
        }
        
        await trigger(validationResults.data);
        setData(initialData);
    };
    
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-5">
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    trailing="*"
                    labelClassName="font-bold"
                    value={data.email}
                    onChange={handleDataChange('email')}
                />
                <PhoneNumberInput
                    name="phone"
                    label="Phone number"
                    trailing="*"
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
                    trailing="*"
                    rows={6}
                    value={data.message}
                    onChange={handleDataChange('message')}
                    wrapperClassName="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1"
                    labelClassName="font-bold"
                    className="bg-gray-100"
                />
            </div>
            <Button
                type="submit"
                loading={isMutating}
                className="font-light px-12 mt-6 mx-auto lg:mr-auto lg:ml-0"
            >
                Submit
            </Button>
        </form>
    );
};

export default ContactForm;
