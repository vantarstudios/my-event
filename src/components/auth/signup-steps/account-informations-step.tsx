import React from 'react';
import Input from '@/components/form/input';

function AccountInformationsStep(): React.JSX.Element {
    return (
        <div className={'w-full'}>
            <form className={'flex flex-col gap-5'}>
                <Input name={'firstName'} label={'Firstname'} trailing={'*'} />
                <Input name={'lastName'} label={'Lastname'} trailing={'*'} />
                <Input name={'email'} label={'E-mail'} trailing={'*'} />
                <Input name={'password'} label={'Password'} trailing={'*'} />
                <Input name={'passwordConfirm'} label={'Confirm password'} trailing={'*'} />
            </form>
        </div>
    );
}

export default AccountInformationsStep;
