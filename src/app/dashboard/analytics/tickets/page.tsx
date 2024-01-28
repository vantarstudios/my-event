'use client';

import type { NextPage } from 'next';
import { useRouter, usePathname, useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import { useRequest } from '@/lib/hooks';
import { ticketsAPI } from '@/lib/api/tickets';
import { Ticket } from '@components/tickets';
import { TicketsListSkeleton } from '@components/ui/skeletons';
import { ChevronLeft } from '@components/ui/icons';
import { Fragment } from 'react';

const updateSearchParamsFactory = (router: ReturnType<typeof useRouter>, pathname: string, searchParams: ReadonlyURLSearchParams) =>
    (key: string, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (value === '') {
            newSearchParams.delete(key);
        } else {
            newSearchParams.set(key, value);
        }
        router.replace(`${pathname}?${newSearchParams.toString()}`);
};

const TicketsPage: NextPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const updateSearchParams = updateSearchParamsFactory(router, pathname, searchParams);
    
    const eventId = searchParams.get('eventId') ?? undefined;
    const eventTitle = searchParams.get('eventTitle') ?? undefined;
    const activeTicketId = searchParams.get('ticketId');
    
    const { data: eventTickets, error, isLoading } = useRequest(
        eventId ? [`event-${eventId}-tickets`, eventId] : null,
        async ([_, eventId]) => {
            const response = await ticketsAPI.getTicketsForEvent(eventId);
            
            if (!response.data.success) {
                throw new Error('Unable to fetch tickets for this event');
            }
            
            return response.data;
        },
        { showError: false }
    );
    
    const handleTicketClick = (ticketId: string) => () => {
        updateSearchParams('ticketId', ticketId !== activeTicketId ? ticketId : '')
    };
    
    return (
        <div className="flex flex-col gap-5 h-full">
            <div
                onClick={() => router.back()}
                className="flex justify-start items-center gap-5 cursor-pointer"
            >
                <ChevronLeft
                    strokeWidth="bold"
                    className="w-5 h-5"
                />
                {
                    eventTitle && (
                        <Fragment>
                            <p className="text-xl max-w-[50rem] break-all line-clamp-1">
                                {eventTitle}
                            </p>
                            <ChevronLeft
                                strokeWidth="thin"
                                className="w-3 h-3 rotate-180"
                            />
                        </Fragment>
                    )
                }
                <p className="text-2xl font-medium">
                    Tickets
                </p>
            </div>
            <div className="flex flex-col gap-5">
                {
                    isLoading
                        ? <TicketsListSkeleton number={3}/>
                        : error
                            ? <p className="text-sm text-center w-full">Sorry, something went wrong</p>
                            : (eventTickets?.data && eventTickets.data.length > 0)
                                ? eventTickets?.data.map((ticket, index) => (
                                    <div
                                        key={index}
                                        onClick={handleTicketClick(ticket.id)}
                                    >
                                        <Ticket
                                            ticket={ticket}
                                            mode="view"
                                            highlight={activeTicketId === ticket.id}
                                        />
                                        <div className={`flex justify-center items-center w-full mx-auto bg-gray-100 transform transition-all duration-300 ${
                                            activeTicketId === ticket.id ? 'opacity-100 h-96' : 'opacity-0 h-0'
                                        }`}>
                                            Not available yet
                                        </div>
                                    </div>
                                ))
                                : <p className="text-sm text-center w-full">No tickets found</p>
                }
            </div>
        </div>
    );
};

export default TicketsPage;
