'use client';

import { useState, Fragment, type FunctionComponent, type FormEvent, type ChangeEvent } from 'react';
import { thousandsCommaFormat, upperSnakeCaseToSentenceCase } from '@/lib/utils';
import { WithdrawalMethodType } from '@/types/constants';
import { Modal, Card, TitledArea } from '@components/ui/layouts';
import { Input, Radio } from '@components/ui/form';
import { PrimaryButton, SecondaryButton } from '@components/ui/buttons';
import { BankCard } from '@components/ui/icons';
import { withdrawalMethods, withdrawalMethodsIcons } from '@/data/withdrawal-methods';

const WithdrawModalAndButton: FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [amountToWithdraw, setAmountToWithdraw] = useState<number>(0);
    const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethodType | null>(null);
    
    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const parsedValue = parseFloat(value);
        
        setAmountToWithdraw(isNaN(parsedValue) ? 0 : parsedValue);
    }
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsOpen(false);
    };
    
    const handleCancel = () => {
        setAmountToWithdraw(0);
        setSelectedMethod(null);
        setIsOpen(false);
    };
    
    return (
        <Fragment>
            <PrimaryButton
                onClick={() => setIsOpen(true)}
                className="text-sm"
            >
                Withdraw
            </PrimaryButton>
            <Modal isOpened={isOpen}>
                <Card className="w-1/3 min-w-max max-h-[75vh] py-5">
                    <form
                        onSubmit={handleSubmit}
                        onReset={handleCancel}
                        className="flex flex-col gap-5"
                    >
                        <div className="flex justify-between items-center gap-5">
                            <p className="text-2xl font-semibold">Withdraw funds</p>
                            <SecondaryButton
                                type="reset"
                                className="px-5 py-2 text-sm font-medium"
                            >
                                Cancel
                            </SecondaryButton>
                        </div>
                        <TitledArea title="Available funds" className="w-full">
                            <div className="flex justify-between items-center gap-10">
                                <p className="text-4xl">{thousandsCommaFormat(25690.30)}</p>
                                <p className="text-white bg-primary rounded-full px-3 py-1">USD</p>
                            </div>
                        </TitledArea>
                        <TitledArea title="Amount to withdraw" className="w-full">
                            <Input
                                type="number"
                                name="amount-to-withdraw"
                                icon={<p className="p-0">USD</p>}
                                value={amountToWithdraw.toString()}
                                onChange={handleAmountChange}
                            />
                        </TitledArea>
                        <TitledArea title="Withdrawal method" className="w-full flex-1">
                            <div className="flex flex-col gap-y-5 max-h-36 h-full overflow-y-auto">
                                {
                                    withdrawalMethods.map((method, index) => {
                                        const WithdrawalMethodIcon = withdrawalMethodsIcons[method.type] || BankCard;
                                        
                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center gap-5 w-full p-3 text-sm bg-gray-50 hover:bg-gray-100 transform transition-all duration-200 ease-in-out">
                                                <div className="flex justify-center items-center gap-4 flex-1">
                                                    <WithdrawalMethodIcon className="w-5 h-5"/>
                                                    <p className="uppercase font-medium">{upperSnakeCaseToSentenceCase(method.type)}</p>
                                                    <p className="flex-1 text-sm break-all line-clamp-1">{method.label}</p>
                                                </div>
                                                <div className="flex justify-center items-center gap-8 w-fit">
                                                    <Radio
                                                        name="withdrawal-method"
                                                        value={method.type}
                                                        checked={selectedMethod === method.type}
                                                        onChange={() => setSelectedMethod(method.type)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TitledArea>
                        <PrimaryButton
                            type="submit"
                            className="w-full mt-5"
                        >
                            Withdraw
                        </PrimaryButton>
                    </form>
                </Card>
            </Modal>
        </Fragment>
    );
};

export default WithdrawModalAndButton;
