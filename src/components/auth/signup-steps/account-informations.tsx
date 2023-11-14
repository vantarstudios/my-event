import type { FunctionComponent } from 'react';
import { Input } from '@components/ui/form';

const AccountInformations: FunctionComponent = () => {
    return (
        <form className="relative flex flex-col justify-start gap-5 w-full">
            <Input name={'firstName'} label={'Firstname'} trailing={'*'} />
            <Input name={'lastName'} label={'Lastname'} trailing={'*'} />
            <Input name={'email'} label={'E-mail'} trailing={'*'} />
            <Input name={'password'} label={'Password'} trailing={'*'} wrapperClassName="peer" />
            <Input name={'passwordConfirm'} label={'Confirm password'} trailing={'*'} wrapperClassName="peer" />
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
