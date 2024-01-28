'use client';

import { Fragment, type FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';
import { leadingZeroFormat } from '@/lib/utils';
import type { Ticket as TicketType, Event, Mode } from '@/types';
import { Button } from '@components/ui/buttons';
import { Person, Pencil, TrashCan, Eye } from '@components/ui/icons';

interface TicketProps {
    ticket: TicketType;
    mode: Mode;
    eventId?: Event['id'];
    eventTitle?: Event['title'];
    highlight?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const Ticket: FunctionComponent<TicketProps> = ({ ticket, eventId, eventTitle, mode, highlight, onEdit, onDelete }) => {
    const router = useRouter();
    
    const handleClick = () => {
        if (mode !== 'edit' && ticket.id && eventTitle && eventId) {
            const searchParams = new URLSearchParams();
            searchParams.set('eventId', eventId);
            searchParams.set('eventTitle', eventTitle);
            searchParams.set('ticketId', ticket.id);
            
            router.push(`/dashboard/analytics/tickets?${searchParams.toString()}`);
        }
    };
    
    return (
        <div
            onClick={handleClick}
            className={`flex justify-between items-center w-full p-3 text-black font-bold transform transition-all duration-200 ${
                mode !== 'edit' && 'cursor-pointer hover:bg-gray-100'
            } ${highlight ? 'bg-gray-100' : 'bg-gray-50'}`}>
            <div className="flex gap-4">
                <span className="w-1 min-h-full rounded-full border-2 border-black bg-black" />
                <div className={`flex items-center gap-5 w-fit py-2 h-full ${highlight && 'text-primary'}`}>
                    <p>{ticket.title}</p>
                    <div className="flex items-center gap-2">
                        <Person className="w-5 h-5"/>
                        <p>{ticket.maxQuantity && `(${leadingZeroFormat(ticket.maxQuantity)})`}</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-10">
                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                        // TODO: Display the formatted ticket
                    }}
                    className="px-0 flex items-center gap-2 w-fit h-ful text-black bg-inherit hover:underline"
                >
                    <Eye className="w-4 h-4"/>
                    <p>Show</p>
                </Button>
                {
                    mode === 'edit' && (
                        <Fragment>
                            <Button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onEdit && onEdit();
                                }}
                                className="px-0 flex items-center gap-2 w-fit h-full text-inherit bg-inherit hover:underline"
                            >
                                <Pencil className="w-4 h-4"/>
                                <p>Edit</p>
                            </Button>
                            <Button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onDelete && onDelete();
                                }}
                                className="px-0 flex items-center gap-2 w-fit h-full text-inherit bg-inherit hover:underline"
                            >
                                <TrashCan className="w-4 h-4"/>
                                <p>Delete</p>
                            </Button>
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
};

export default Ticket;
