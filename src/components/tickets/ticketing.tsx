'use client';

import { useState, type FunctionComponent } from 'react';
import { hasSameDate } from '@/lib/utils';
import type { Ticket as TicketType, Event, Layout } from '@/types';
import type { CreateTicketPayload, UpdateTicketPayload } from '@/types/tickets';
import { CreateOrUpdateTicket, TicketsList, Ticket } from '@components/tickets';
import { TitledArea } from '@components/ui/layouts';
import { Input } from '@components/ui/form';
import { Button } from '@components/ui/buttons';

interface TicketingProps {
    layout: Layout;
    event?: Event;
    newTickets: CreateTicketPayload[];
    isUpdating: boolean;
    onTicketEdit: (ticketId: TicketType['id'], data: UpdateTicketPayload, hasChanged: boolean) => Promise<void>;
    onTicketAdd: (ticket: CreateTicketPayload, toDelete?: boolean) => void;
}

const AddTicketButton: FunctionComponent<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            className="text-sm">
            + Add a ticket
        </Button>
    )
};

const Ticketing: FunctionComponent<TicketingProps> = ({ layout, event, newTickets, isUpdating, onTicketEdit, onTicketAdd }) => {
    const [smiCode, setSmiCode] = useState('');
    const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketType | undefined>(undefined);
    
    const handleTicketEdit = (ticket: TicketType) => {
        setSelectedTicket(ticket);
        setIsCreateTicketModalOpen(true);
    };
    
    const resetModal = () => {
        setSelectedTicket(undefined);
        setIsCreateTicketModalOpen(false);
    };
    
    const handleTicketSave = async (ticket: CreateTicketPayload) => {
        
        const getHasChanged = () => {
            const changedValues = Object.entries(ticket)
                .filter(([key, value]) => selectedTicket && (
                    value !== selectedTicket[key as keyof TicketType]
                     && (
                        (
                            (value === null || value === undefined)
                            && Boolean(value) !== Boolean(selectedTicket[key as keyof TicketType])
                        )
                        || (value !== null && value !== undefined)
                    )
                ));
            
            if (changedValues.length === 0) {
                return false;
            }
            
            if (changedValues.length === 1 && changedValues[0]![0] === 'salesEndDate') {
                return !hasSameDate(changedValues[0]![1] as string, selectedTicket!.salesEndDate);
            }
            
            return true;
        };
        
        !selectedTicket
            ? onTicketAdd(ticket)
            : await onTicketEdit(selectedTicket.id, ticket, getHasChanged());
            resetModal();
    };
    
    return (
        <div className="relative flex flex-col gap-10 w-full h-full">
            {layout === 'edit' && <AddTicketButton onClick={() => setIsCreateTicketModalOpen(true)} />}
            <div className="flex flex-col gap-5 max-h-72 overflow-y-auto">
                {
                    event && (
                        <TicketsList
                            mode="edit"
                            event={event}
                            onTicketEdit={handleTicketEdit}
                            showEmpty={newTickets.length === 0 && event.id !== undefined}
                        />
                    )
                }
                {
                    newTickets.map((ticket, index) => (
                        <Ticket
                            key={index}
                            mode="edit"
                            eventId={event?.id}
                            eventTitle={event?.title}
                            ticket={ticket as TicketType}
                            onDelete={() => onTicketAdd(ticket, true)}
                        />
                    ))
                }
            </div>
            {layout === 'create' && <AddTicketButton onClick={() => setIsCreateTicketModalOpen(true)} />}
            <TitledArea title="Add SMI code" className="absolute bottom-0 left-0 w-fit">
                <Input
                    type="text"
                    name="smiCode"
                    placeholder="SMI code"
                    value={smiCode}
                    onChange={(event) => setSmiCode(event.target.value)}
                />
            </TitledArea>
            {
                isCreateTicketModalOpen && (
                    <CreateOrUpdateTicket
                        isOpened={isCreateTicketModalOpen}
                        ticket={selectedTicket}
                        isLoading={isUpdating}
                        eventStartingDate={event?.startingDate}
                        eventEndingDate={event?.endingDate}
                        onCancel={resetModal}
                        onSave={handleTicketSave}
                    />
                )
            }
        </div>
    );
};

export default Ticketing;
