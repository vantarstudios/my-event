'use client';

import type { FormEvent, FunctionComponent, MouseEvent } from 'react';
import { Fragment, useState, useEffect } from 'react';
import { v4 as uuid4 } from 'uuid';
import { useToggle, useToggleVisibility } from '@/lib/hooks';
import { capitalize, monthNumToString, thousandsCommaFormat, getISOString, parseDateTime } from '@/lib/utils';
import { InvitationType } from '@/types/constants';
import type { InvitationTypeUnion, ParsedDate, Event } from '@/types';
import { ticketTypes } from '@/types';
import { createTicketSchema } from '@/types/tickets';
import type { CreateTicketPayload, CreateTicketErrors } from '@/types/tickets';
import { Button } from '@components/ui';
import { Checkbox, DateInput, Input, NumberInput, Select, Switch } from '@components/ui/form';
import { Copy, People, Person } from '@components/ui/icons';
import { Card, Modal, TitledArea, TitledTextArea } from '@components/ui/layouts';
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils';
import type { ZodError } from 'zod';

interface CreateTicketProps {
    eventStartingDate?: Event['startingDate'];
    eventEndingDate?: Event['endingDate'];
    onSave: (newTicket: CreateTicketPayload) => void;
}

const userPlanInfos = {
    eventTitle: 'Event name',
    currency: 'XOF',
    eventSizeLimit: 100,
    ticketsProcessingFeesPercentage: 20,
};

const MAX_GROUP_SIZE = 10;

const buildOptions = (limit: number) => {
    return [
        'Unlimited',
        ...Array(limit)
            .fill(0)
            .map((_, index) => `${index + 1}`)
            .slice(1),
    ];
};

const getGroupSizes = (eventSizeLimit: number) => {
    return buildOptions(Math.min(MAX_GROUP_SIZE, eventSizeLimit || MAX_GROUP_SIZE));
};

const getGroupsLimit = (eventSizeLimit: number, groupSize: string) => {
    return buildOptions(Math.floor(eventSizeLimit / (groupSize === 'Unlimited' ? MAX_GROUP_SIZE : Number(groupSize))));
};

const getExpectedParticipants = (eventSizeLimit: number) => {
    return buildOptions(eventSizeLimit);
};

const CreateTicket: FunctionComponent<CreateTicketProps> = ({ eventStartingDate, eventEndingDate, onSave }) => {
    const {
        ref: modalRef,
        isVisible: isModalOpened,
        setIsVisible: setIsModalOpened
    } = useToggleVisibility<HTMLFormElement>(false);
    const [isGroup, setIsGroup] = useState<boolean>(false);
    const [isCombo, toggleIsCombo] = useToggle<boolean>(false, true);
    const [invitationsEmails, setInvitationsEmails] = useState<string[]>([]);
    const [invitationLink, setInvitationLink] = useState('');
    const [isInvitationLinkCopied, setIsInvitationLinkCopied] = useState<boolean>(false);
    const [selectedGroupsLimit, setSelectedGroupsLimit] = useState<string>('Unlimited');
    const [transferFees, toggleTransferFees] = useToggle<boolean>(false, true);
    const [selectedTicketTypes, setSelectedTicketTypes] = useState<(typeof ticketTypes)[number][]>([]);
    const [endSalesOnStartDate, toggleEndSalesOnStartDate] = useToggle<boolean>(false, true);
    const [formErrors, setFormErrors] = useState<CreateTicketErrors>({} as CreateTicketErrors);
    
    const [ticketTitle, setTicketTitle] = useState<string>('');
    const [ticketDescription, setTicketDescription] = useState<string>('');
    const [salesEndDate, setSalesEndDate] = useState<ParsedDate | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [selectedInvitationType, setSelectedInvitationType] = useState<InvitationTypeUnion>(InvitationType.FREE);
    const [expectedParticipants, setExpectedParticipants] = useState<string>('Unlimited');
    const [selectedGroupSize, setSelectedGroupSize] = useState<string>('Unlimited');
    
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
    }

    const pricePerParticipant = `${thousandsCommaFormat(
        price / (selectedGroupSize === 'Unlimited' ? MAX_GROUP_SIZE : Number(selectedGroupSize)),
    )}`;

    const handleModalOpen = () => {
        setIsModalOpened(true);
        setInvitationLink(`https://myevent-invitation-${encodeToBase64(userPlanInfos.eventTitle)}-${uuid4()}`);
    };

    const handleIsGroupClick = (value: boolean) => () => {
        setIsGroup(value);
    };

    const handleGroupSizeChange = (value: string) => {
        setSelectedGroupSize(value);
        setSelectedGroupsLimit('Unlimited');
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
        setSelectedInvitationType(value.toLowerCase() as InvitationTypeUnion);
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
        
        const maxQuantity = expectedParticipants === 'Unlimited' ? undefined : Number(expectedParticipants);
        
        const newTicket: CreateTicketPayload = {
            title: ticketTitle,
            description: ticketDescription,
            salesEndDate: getISOString({ date: salesEndDate, time: null }),
            price: price,
            invitationType: selectedInvitationType,
            allowedPeople: isGroup && selectedGroupSize !== 'Unlimited' ? Number(selectedGroupSize) : undefined,
            maxQuantity: maxQuantity,
            limited: maxQuantity !== undefined,
        };
        
        const validatedTicket = createTicketSchema.safeParse(newTicket);
        
        if (!validatedTicket.success) {
            setFormErrors((validatedTicket.error as ZodError).formErrors.fieldErrors);
            return;
        }
        
        setFormErrors({} as CreateTicketErrors);
        setIsModalOpened(false);
        onSave(validatedTicket.data);
    };
    
    useEffect(() => {
        if (!isModalOpened) {
            resetForm();
        }
    }, [isModalOpened]);

    return (
        <Fragment>
            <Button onClick={handleModalOpen} className="text-sm">+ Add a ticket</Button>
            <Modal isOpened={isModalOpened}>
                <Card className="w-[40vw] h-[90vh] py-5 pl-5 pr-5">
                    <form ref={modalRef} onSubmit={handleSubmit} className="flex flex-col gap-5 w-full h-full pl-5">
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-semibold">{ticketTitle || 'New ticket'}</p>
                            <Button type="submit">Save</Button>
                        </div>
                        <div className="flex flex-col gap-7 pr-5 pb-5 overflow-y-auto">
                            <div className="flex justify-center items-center gap-5">
                                <Card
                                    onClick={handleIsGroupClick(false)}
                                    className={`flex justify-between items-center gap-5 h-16 border border-opacity-10 cursor-pointer ${
                                        isGroup ? 'text-black bg-white' : 'text-white bg-primary'
                                    }`}
                                >
                                    <Person className="w-6 h-6" />
                                    <p className="font-bold">Single ticket</p>
                                </Card>
                                <Card
                                    onClick={handleIsGroupClick(true)}
                                    className={`flex justify-between items-center gap-5 h-16 border border-opacity-10 cursor-pointer ${
                                        isGroup ? 'text-white bg-primary' : 'text-black bg-white'
                                    }`}
                                >
                                    <People className="w-8 h-8" />
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
                                variant="form"
                                className="text-sm"
                            />
                            <TitledArea
                                title="Type of ticket:"
                                indicator={
                                    <div className="flex justify-between items-center gap-1 w-fit">
                                        <p className="text-sm font-bold">Combo:</p>
                                        <Switch onClick={handleIsComboClick} />
                                    </div>
                                }
                            >
                                <div className="flex justify-between items-center gap-10 text-sm">
                                    {ticketTypes.map((ticketType) => (
                                        <Button
                                            key={ticketType}
                                            onClick={handleTicketTypeClick(ticketType)}
                                            className={`w-full py-2 ${
                                                selectedTicketTypes.includes(ticketType) && 'bg-primary'
                                            }`}
                                            disabled={ticketType === 'invitation'}
                                        >
                                            {capitalize(ticketType)}
                                        </Button>
                                    ))}
                                </div>
                            </TitledArea>
                            {isGroup && (
                                <div className="flex justify-between items-center child:basis-2/5">
                                    <TitledArea title="Members per group:">
                                        <Select
                                            name="group-size"
                                            value={selectedGroupSize}
                                            options={getGroupSizes(userPlanInfos.eventSizeLimit)}
                                            onChange={handleGroupSizeChange}
                                            wrapperClassName="text-sm"
                                        />
                                    </TitledArea>
                                    <TitledArea title="Groups limit:">
                                        <Select
                                            name="groups-limit"
                                            value={selectedGroupsLimit}
                                            options={getGroupsLimit(userPlanInfos.eventSizeLimit, selectedGroupSize)}
                                            onChange={setSelectedGroupsLimit}
                                            wrapperClassName="text-sm"
                                        />
                                    </TitledArea>
                                </div>
                            )}
                            {!selectedTicketTypes.includes('paid') && (
                                <TitledArea
                                    title="Price"
                                    indicator={
                                        isGroup &&
                                        selectedGroupSize !== 'Unlimited' && (
                                            <div className="flex justify-center items-center gap-2">
                                                <Person className="w-4 h-4" />
                                                <p className="text-sm font-medium">
                                                    {pricePerParticipant} {userPlanInfos.currency}
                                                </p>
                                            </div>
                                        )
                                    }
                                >
                                    <NumberInput
                                        errors={formErrors.price}
                                        name="price"
                                        value={String(price)}
                                        onChange={setPrice}
                                        icon={
                                            <span className="text-primary font-medium">{userPlanInfos.currency}</span>
                                        }
                                        wrapperClassName="text-sm"
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
                                            wrapperClassName="text-sm"
                                        />
                                        {selectedInvitationType === InvitationType.UNIQUE_LINK && (
                                            <Input
                                                name="invitation-link"
                                                value={invitationLink}
                                                variant="default"
                                                icon={
                                                    <div className="relative">
                                                        {isInvitationLinkCopied && (
                                                            <p className="absolute bottom-full right-1 p-1 rounded-md text-sm text-white bg-black transition-all">
                                                                Copied!
                                                            </p>
                                                        )}
                                                        <Copy
                                                            className="w-5 h-5 cursor-pointer"
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
                                                variant="default"
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
                                variant="form"
                                className="py-5 text-sm"
                            />
                            <TitledArea title="Sales ending date:">
                                <div className="flex justify-between items-center w-full h-full">
                                    <div className="flex flex-col justify-start mb-auto">
                                        <DateInput
                                            name="sales-end-date"
                                            value={salesEndDate}
                                            onChange={handleSalesEndDateChange}
                                            onClear={() => setSalesEndDate(null)}
                                            minDate={new Date()}
                                            maxDate={eventEndingDate ? new Date(eventEndingDate) : undefined}
                                            className="w-fit"
                                        />
                                        <p className="py-2 text-xs text-red-500">
                                            {formErrors.salesEndDate?.[0]}
                                        </p>
                                        <Checkbox
                                            name="transfer-fees"
                                            label="End sales when event starts"
                                            checked={endSalesOnStartDate}
                                            onChange={handleEndSalesOnStartDateChange}
                                            className="text-xs"
                                        />
                                    </div>
                                    <div className="mb-auto p-5 text-white bg-black rounded-2xl">
                                        {salesEndDate && (
                                            <p className="mb-3 text-sm">
                                                Sales will end on&nbsp;
                                                <span className="text-primary">
                                                    {salesEndDate.day} {monthNumToString(salesEndDate.month)} {salesEndDate.year}
                                                </span>
                                            </p>
                                        )}
                                        <p className="text-xs break-words">
                                            Sales will end at 11:59 PM of that day
                                        </p>
                                    </div>
                                </div>
                            </TitledArea>
                            <TitledArea title="Expected participants:">
                                <Select
                                    name="expected-participants"
                                    value={expectedParticipants}
                                    options={getExpectedParticipants(userPlanInfos.eventSizeLimit)}
                                    onChange={setExpectedParticipants}
                                    wrapperClassName="text-sm"
                                />
                            </TitledArea>
                            <div className="flex flex-col gap-5">
                                <p className="text-xs text-primary">
                                    {userPlanInfos.ticketsProcessingFeesPercentage}% of tickets sales will be subtracted
                                    as processing fees
                                </p>
                                <Checkbox
                                    name="transfer-fees"
                                    label="Transfer processing fees to user"
                                    checked={transferFees}
                                    onChange={toggleTransferFees}
                                />
                            </div>
                        </div>
                    </form>
                </Card>
            </Modal>
        </Fragment>
    );
};

export default CreateTicket;
