import type { FunctionComponent } from 'react';
import { Input } from '@components/ui/form';

const AccountInformations: FunctionComponent = () => {
    return (
        <form className="relative flex flex-col justify-start gap-5 w-full">
            <Input name="first-name" label="First name" trailing="*" autoComplete="given-name" variant="auth" autoFocus />
            <Input name="last-name" label="Last name" trailing="*" autoComplete="family-name" variant="auth" />
            <Input name="email" label="Email" trailing="*" autoComplete="email" type="email" variant="auth" />
            <Input
                name="password"
                label="Password"
                trailing="*"
                wrapperClassName="peer"
                autoComplete="new-password"
                type="password"
                variant="auth"
            />
            <Input
                name="password-confirm"
                label="Confirm password"
                trailing="*"
                wrapperClassName="peer"
                autoComplete="new-password"
                type="password"
                variant="auth"
            />
            <div className="absolute left-full bottom-1/4 ml-10 p-8 text-white bg-black rounded-3xl w-max h-fit hidden peer-focus-within:block">
                <p>Password must contain:</p>
                <ul className="pl-5 list-disc">
                    <li>Capital character</li>
                    <li>Number & special characters</li>
                    <li>Minimum 8 characters</li>
                </ul>
            </div>
        </form>
    );
};

export default AccountInformations;
