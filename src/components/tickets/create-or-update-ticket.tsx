'use client';

import { useState, useEffect, type FormEvent, type FunctionComponent, type MouseEvent } from 'react';
import { v4 as uuid4 } from 'uuid';
import type { ZodError } from 'zod';
import { useToggle } from '@/lib/hooks';
import { capitalize, monthNumToString, thousandsCommaFormat, getISOString, parseDateTime, hasSameDate, toast } from '@/lib/utils';
import { InvitationType } from '@/types/constants';
import { createTicketSchema, type CreateTicketPayload, type CreateTicketErrors } from '@/types/tickets';
import { ticketTypes, type InvitationTypeUnion, type ParsedDate, type Ticket, type Event } from '@/types';
import { Button } from '@components/ui/buttons';
import { Copy, People, Person } from '@components/ui/icons';
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils';
import { Card, Modal, TitledArea, TitledTextArea } from '@components/ui/layouts';
import { Checkbox, DateInput, Input, NumberInput, Select, Switch } from '@components/ui/form';

interface CreateTicketProps {
    isOpened: boolean;
    ticket?: Ticket;
    eventStartingDate?: Event['startingDate'];
    eventEndingDate?: Event['endingDate'];
    isLoading?: boolean;
    onCancel: () => void;
    onSave: (newTicket: CreateTicketPayload) => void;
}

type TicketTypeUnion = (typeof ticketTypes)[number];

const userPlanInfos = {
    eventTitle: 'Event name',
    currency: 'XOF',
    eventSizeLimit: 500,
    ticketsProcessingFeesPercentage: 0.05,
};

const MAX_GROUP_SIZE = 10;

const buildOptions = (limit: number, step?: number, limited = true): string[] => {
    return [
        ...(limited ? ['Unlimited'] : []),
        ...Array(limit)
            .fill(0)
            .map((_, index) => `${index + 1}`)
            .slice(1)
            .filter((value) => (step ? Number(value) % step === 0 : true)),
    ];
};

const getGroupSizes = (eventSizeLimit: number): string[] => {
    return buildOptions(Math.min(MAX_GROUP_SIZE, eventSizeLimit || MAX_GROUP_SIZE), 1, false);
};

const getGroupsLimit = (eventSizeLimit: number, groupSize: string) => {
    return buildOptions(Math.floor(eventSizeLimit / (groupSize === '' ? MAX_GROUP_SIZE : Number(groupSize))));
};

const getExpectedParticipants = (eventSizeLimit: number) => {
    return buildOptions(eventSizeLimit, 10);
};

const CreateOrUpdateTicket: FunctionComponent<CreateTicketProps> = ({ ticket, isOpened, eventStartingDate, eventEndingDate, isLoading, onCancel, onSave }) => {
    const endSalesOnStartDateValue = ticket?.salesEndDate && eventStartingDate
        ? hasSameDate(ticket.salesEndDate, eventStartingDate)
        : false;
    
    const [formErrors, setFormErrors] = useState<CreateTicketErrors>({} as CreateTicketErrors);
    const [invitationsEmails, setInvitationsEmails] = useState<string[]>([]);
    const [invitationLink, setInvitationLink] = useState(`https://myevent-invitation-${encodeToBase64(userPlanInfos.eventTitle)}-${uuid4()}`);
    const [isInvitationLinkCopied, setIsInvitationLinkCopied] = useState<boolean>(false);
    const [selectedTicketTypes, setSelectedTicketTypes] = useState<TicketTypeUnion[]>([
        ...(ticket?.price !== undefined
            ? ticket?.price > 0
                ? ['paid']
                : ['free']
            : []) as TicketTypeUnion[],
        ...(ticket?.invitationType !== InvitationType.FREE ? ['invitation'] : []) as TicketTypeUnion[],
    ]);
    const [transferFees, toggleTransferFees] = useToggle<boolean>(false, true);
    const [isCombo, toggleIsCombo] = useToggle<boolean>(selectedTicketTypes.length > 1, selectedTicketTypes.length <= 1);
    const [endSalesOnStartDate, toggleEndSalesOnStartDate] = useToggle<boolean>(endSalesOnStartDateValue, !endSalesOnStartDateValue);
    
    const [isGroup, setIsGroup] = useState<boolean>(Boolean(ticket?.allowedPeople) && ticket!.allowedPeople > 1);
    const [ticketTitle, setTicketTitle] = useState<string>(ticket?.title || '');
    const [ticketDescription, setTicketDescription] = useState<string>(ticket?.description || '');
    const [salesEndDate, setSalesEndDate] = useState<ParsedDate | null>(ticket?.salesEndDate
        ? parseDateTime(ticket.salesEndDate, 'date')
        : null
    );
    const [price, setPrice] = useState<number>(ticket?.price || 0);
    const [selectedInvitationType, setSelectedInvitationType] = useState<InvitationTypeUnion>(ticket?.invitationType || InvitationType.FREE);
    const [expectedParticipants, setExpectedParticipants] = useState<string>(ticket?.maxQuantity ? String(ticket.maxQuantity) : 'Unlimited');
    const [selectedGroupSize, setSelectedGroupSize] = useState<string>(ticket?.allowedPeople ? String(ticket.allowedPeople) : '');
    const [selectedGroupsLimit, setSelectedGroupsLimit] = useState<string>(ticket?.maxQuantity
        ? String(Math.floor(ticket.maxQuantity / (ticket.allowedPeople || 1)))
        : 'Unlimited'
    );

    const handleIsGroupClick = (value: boolean) => () => {
        setIsGroup(value);
        
        if (!value) {
            setSelectedGroupSize('Unlimited');
            setSelectedGroupsLimit('Unlimited');
        }
    };

    const handleGroupSizeChange = (value: string) => {
        setSelectedGroupSize(value);
        setSelectedGroupsLimit(expectedParticipants === 'Unlimited'
            ? 'Unlimited'
            : String(Math.floor(Number(expectedParticipants) / Number(value)))
        );
    };

    const handleIsComboClick = () => {
        toggleIsCombo();
        setSelectedTicketTypes((prevSelectedTicketTypes) => prevSelectedTicketTypes.slice(0, 1));
    };

    const handleTicketTypeClick =
        (ticketType: (typeof ticketTypes)[number]) => (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            if (!isCombo) {
                setSelectedTicketTypes([ticketType]);
                return;
            }

            setSelectedTicketTypes((prevSelectedTicketTypes) => {
                if (prevSelectedTicketTypes.includes(ticketType)) {
                    return prevSelectedTicketTypes.filter((prevTicketType) => prevTicketType !== ticketType);
                }

                if (ticketType === 'free' && prevSelectedTicketTypes.includes('paid')) {
                    return ['free', ...prevSelectedTicketTypes.filter((prevTicketType) => prevTicketType !== 'paid')];
                }

                if (ticketType === 'paid' && prevSelectedTicketTypes.includes('free')) {
                    return ['paid', ...prevSelectedTicketTypes.filter((prevTicketType) => prevTicketType !== 'free')];
                }

                return [...prevSelectedTicketTypes, ticketType];
            });
        };

    const handleInvitationTypeChange = (value: string) => {
        setSelectedInvitationType(value.toUpperCase() as InvitationTypeUnion);
    };

    const handleInvitationsEmailsChange = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInvitationsEmails(event.currentTarget.value.split(','));
    };

    const handleCopyInvitationLink = () => {
        navigator.clipboard.writeText(invitationLink).then(() => {
            setIsInvitationLinkCopied(true);
            setTimeout(() => setIsInvitationLinkCopied(false), 2000);
        });
    };
    
    const handleSalesEndDateChange = (value: ParsedDate) => {
        if (endSalesOnStartDate) {
            toggleEndSalesOnStartDate();
        }
        
        setSalesEndDate(value);
    };
    
    const handleEndSalesOnStartDateChange = () => {
        if (!endSalesOnStartDate && eventStartingDate) {
            setSalesEndDate(parseDateTime(eventStartingDate, 'date'));
        } else {
            setSalesEndDate(null);
        }
        
        toggleEndSalesOnStartDate();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (isLoading) return;
        
        if (isGroup && parseInt(selectedGroupSize) === 1) {
            toast.error('Group size must be greater than 1');
            return;
        }
        
        const maxQuantity = expectedParticipants === 'Unlimited' ? undefined : Number(expectedParticipants);
        
        const newTicket: CreateTicketPayload = {
            title: ticketTitle,
            description: ticketDescription,
            salesEndDate: getISOString({ date: salesEndDate, time: null }),
            price: selectedTicketTypes.includes('paid') ? price : 0,
            invitationType: selectedInvitationType,
            allowedPeople: isGroup ? Number(selectedGroupSize) : 1,
            maxQuantity: maxQuantity,
            limited: maxQuantity !== undefined,
        };
        
        const validatedTicket = createTicketSchema.safeParse(newTicket);
        
        if (!validatedTicket.success) {
            setFormErrors((validatedTicket.error as ZodError).formErrors.fieldErrors);
            return;
        }
        
        setFormErrors({} as CreateTicketErrors);
        onSave(validatedTicket.data);
    };
    
    useEffect(() => {
        const resetForm = () => {
            setIsGroup(false);
            setInvitationsEmails([]);
            setInvitationLink('');
            setIsInvitationLinkCopied(false);
            setSelectedGroupsLimit('Unlimited');
            setSelectedTicketTypes([]);
            setFormErrors({} as CreateTicketErrors);
            setTicketTitle('');
            setTicketDescription('');
            setSalesEndDate(null);
            setPrice(0);
            setSelectedInvitationType(InvitationType.FREE);
            setExpectedParticipants('Unlimited');
            setSelectedGroupSize('Unlimited');
            
            if (isCombo) {
                toggleIsCombo();
            }
            
            if (transferFees) {
                toggleTransferFees();
            }
            
            if (endSalesOnStartDate) {
                toggleEndSalesOnStartDate();
            }
        };
        
        if (!isOpened) {
            resetForm();
        }
    }, [isOpened]);

    return (
        <Modal isOpened={isOpened}>
            <Card className="min-w-max h-[90vh] py-5 pl-5 pr-5">
                <form
                    onSubmit={handleSubmit}
                    onReset={onCancel}
                    className="flex flex-col gap-5 w-full h-full pl-5"
                >
                    <div className="flex justify-between items-center">
                        <p className="w-[25rem] break-all text-2xl font-semibold line-clamp-1">{ticketTitle || 'New ticket'}</p>
                        <Button
                            type="reset"
                            className="px-5 py-2 text-sm text-black font-medium border-2 border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white"
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className="flex flex-col gap-7 pr-5 pb-5 overflow-y-auto">
                        <div className="flex justify-center items-center gap-5">
                            <Card
                                onClick={handleIsGroupClick(false)}
                                className={`flex justify-center items-center gap-5 w-full h-16 px-5 border border-opacity-10 rounded-2xl cursor-pointer ${
                                    isGroup ? 'text-black bg-white' : 'text-white bg-primary'
                                }`}
                            >
                                <Person className="w-6 h-6"/>
                                <p className="font-bold">Single ticket</p>
                            </Card>
                            <Card
                                onClick={handleIsGroupClick(true)}
                                className={`flex justify-center items-center gap-5 w-full h-16 px-5 border border-opacity-10 rounded-2xl cursor-pointer ${
                                    isGroup ? 'text-white bg-primary' : 'text-black bg-white'
                                }`}
                            >
                                <People className="w-8 h-8"/>
                                <p className="font-bold">Group ticket</p>
                            </Card>
                        </div>
                        <TitledTextArea
                            title="Ticket title:"
                            value={ticketTitle}
                            onChange={setTicketTitle}
                            errors={formErrors.title}
                            placeholder="ex: Standard Pass"
                            rows={1}
                            maxLength={150}
                            className="text-sm bg-gray-100"
                        />
                        <TitledArea
                            title="Type of ticket:"
                            indicator={
                                <div className="flex justify-between items-center gap-1 w-fit">
                                    <p className="text-sm font-bold">Combo:</p>
                                    <Switch onChange={handleIsComboClick} checked={isCombo}/>
                                </div>
                            }
                        >
                            <div className="flex justify-between items-center gap-5 text-sm">
                                {ticketTypes.map((ticketType) => (
                                    <Button
                                        key={ticketType}
                                        onClick={handleTicketTypeClick(ticketType)}
                                        className={`w-full py-2 ${
                                            selectedTicketTypes.includes(ticketType) && 'bg-primary'
                                        }`}
                                    >
                                        {capitalize(ticketType)}
                                    </Button>
                                ))}
                            </div>
                        </TitledArea>
                        {isGroup && (
                            <div className="flex justify-between items-center gap-10">
                                <TitledArea title="Members per group:" className="w-full">
                                    <Select
                                        name="group-size"
                                        value={selectedGroupSize}
                                        options={getGroupSizes(userPlanInfos.eventSizeLimit)}
                                        onChange={handleGroupSizeChange}
                                    />
                                </TitledArea>
                                <TitledArea title="Groups limit:" className="w-full">
                                    <Select
                                        name="groups-limit"
                                        value={selectedGroupsLimit}
                                        options={getGroupsLimit(userPlanInfos.eventSizeLimit, selectedGroupSize)}
                                        onChange={setSelectedGroupsLimit}
                                    />
                                </TitledArea>
                            </div>
                        )}
                        {selectedTicketTypes.includes('paid') && (
                            <TitledArea
                                title="Price"
                                indicator={
                                    isGroup &&
                                    selectedGroupSize !== 'Unlimited' && (
                                        <p className="px-2 py-1 text-sm text-white font-light bg-black rounded-md">
                                            Commission:&nbsp;
                                            <span className="text-sm font-semibold text-primary">
                                                {thousandsCommaFormat(price * userPlanInfos.ticketsProcessingFeesPercentage)} {userPlanInfos.currency}
                                            </span>
                                        </p>
                                    )
                                }
                            >
                                <NumberInput
                                    errors={formErrors.price}
                                    name="price"
                                    value={price.toString()}
                                    onChange={setPrice}
                                    icon={
                                        <span className="text-primary font-medium">{userPlanInfos.currency}</span>
                                    }
                                />
                            </TitledArea>
                        )}
                        {selectedTicketTypes.includes('invitation') && (
                            <TitledArea title="Invitation type:">
                                <div className="flex flex-col gap-5">
                                    <Select
                                        name="invitation-type"
                                        value={capitalize(selectedInvitationType)}
                                        options={Object.values(InvitationType).map((invitationType) =>
                                            capitalize(invitationType),
                                        )}
                                        onChange={handleInvitationTypeChange}
                                    />
                                    {selectedInvitationType === InvitationType.UNIQUE_LINK && (
                                        <Input
                                            name="invitation-link"
                                            value={invitationLink}
                                            variant="auth"
                                            icon={
                                                <div className="relative">
                                                    {isInvitationLinkCopied && (
                                                        <p className="absolute bottom-full right-1 p-1 rounded-md text-sm text-white bg-black transition-all">
                                                            Copied!
                                                        </p>
                                                    )}
                                                    <Copy
                                                        className="w-4 h-4 cursor-pointer"
                                                        onClick={handleCopyInvitationLink}
                                                    />
                                                </div>
                                            }
                                            className="underline"
                                            disabled
                                        />
                                    )}
                                    {selectedInvitationType === InvitationType.EMAIL && (
                                        <Input
                                            name="invitation-emails"
                                            value={invitationsEmails.join(',')}
                                            onChange={handleInvitationsEmailsChange}
                                            placeholder="Separate e-mails with a comma"
                                            variant="auth"
                                        />
                                    )}
                                </div>
                            </TitledArea>
                        )}
                        <TitledTextArea
                            title="Description:"
                            value={ticketDescription}
                            onChange={setTicketDescription}
                            errors={formErrors.description}
                            placeholder="Let participants know what are the advantages or limits of this ticket"
                            rows={5}
                            maxLength={150}
                            className="py-5 text-sm bg-gray-100 rounded-2xl"
                        />
                        <div className="flex justify-between items-start gap-10 w-full">
                            <TitledArea title="Sales ending date:">
                                <div className="flex flex-col justify-start w-full h-full mb-auto">
                                    <DateInput
                                        name="sales-end-date"
                                        value={salesEndDate}
                                        onChange={handleSalesEndDateChange}
                                        onClear={() => setSalesEndDate(null)}
                                        minDate={new Date()}
                                        maxDate={eventEndingDate ? new Date(eventEndingDate) : undefined}
                                        className="w-fit"
                                    />
                                    <p className="py-2 text-sm text-red-500">
                                        {formErrors.salesEndDate?.[0]}
                                    </p>
                                    <Checkbox
                                        name="transfer-fees"
                                        label="End sales when event starts"
                                        checked={endSalesOnStartDate}
                                        onChange={handleEndSalesOnStartDateChange}
                                        className="text-sm"
                                    />
                                </div>
                            </TitledArea>
                            <div className="mb-auto p-3 text-white bg-black rounded-2xl">
                                {salesEndDate && (
                                    <p className="mb-3 text-sm">
                                        Sales will end on&nbsp;
                                        <span className="text-primary">
                                                    {salesEndDate.day} {monthNumToString(salesEndDate.month)} {salesEndDate.year}
                                                </span>
                                    </p>
                                )}
                                <p className="text-sm break-words">
                                    Sales will end at 11:59 PM of that day
                                </p>
                            </div>
                        </div>
                        <TitledArea title="Expected participants:">
                            <Select
                                name="expected-participants"
                                value={expectedParticipants}
                                options={getExpectedParticipants(userPlanInfos.eventSizeLimit)}
                                onChange={setExpectedParticipants}
                            />
                        </TitledArea>
                        <div className="flex flex-col gap-5">
                            <p className="text-sm text-primary">
                                {userPlanInfos.ticketsProcessingFeesPercentage * 100}% of tickets sales will be subtracted
                                as processing fees
                            </p>
                            <Checkbox
                                name="transfer-fees"
                                label="Transfer processing fees to a user"
                                checked={transferFees}
                                onChange={toggleTransferFees}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end items-center w-full">
                        <Button type="submit" loading={isLoading}>Save</Button>
                    </div>
                </form>
            </Card>
        </Modal>
    );
};

export default CreateOrUpdateTicket;
