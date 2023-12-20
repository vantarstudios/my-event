import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import type { Ticket as TicketType, Mode } from '@/types';
import { Button } from '@components/ui';
import { Person, Pencil, TrashCan, Eye } from '@components/ui/icons';

interface TicketProps {
    ticket: TicketType; // Yep, I know it's funny
    mode: Mode;
    onDelete?: () => void;
}

const Ticket: FunctionComponent<TicketProps> = ({ ticket, mode, onDelete }) => {
    return (
        <div key={ticket.title} className="flex justify-between items-center w-full p-3 text-black font-bold bg-gray-50">
            <div className="flex gap-4">
                <span className="w-1 min-h-full rounded-full border-2 border-black bg-black" />
                <div className="flex items-center gap-4 w-fit py-2 h-full">
                    <p>{ticket.title}</p>
                    <Person className="w-5 h-5" />
                </div>
            </div>
            <div className="flex gap-10">
                {mode === 'edit' && (
                    <Fragment>
                        <Button className="px-0 flex items-center gap-2 w-fit h-full text-inherit bg-inherit hover:underline">
                            <Pencil className="w-4 h-4" />
                            <p>Edit</p>
                        </Button>
                        <Button className="px-0 flex items-center gap-2 w-fit h-full text-inherit bg-inherit hover:underline" onClick={onDelete}>
                            <TrashCan className="w-4 h-4" />
                            <p>Delete</p>
                        </Button>
                    </Fragment>
                )}
                <Button className="px-0 flex items-center gap-2 w-fit h-ful text-black bg-inherit hover:underline">
                    <Eye className="w-4 h-4" />
                    <p>Show</p>
                </Button>
            </div>
        </div>
    );
};

export default Ticket;
