import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import type { TicketType as TTicketTypeType, Mode } from '@/types';
import { Button } from '@components/ui';
import { User, Pencil, TrashCan, Eye } from '@components/ui/icons';

interface TicketTypeProps {
    ticket: TTicketTypeType; // Yep, I know it's funny
    mode: Mode;
}

const TicketType: FunctionComponent<TicketTypeProps> = ({ ticket, mode }) => {
    return (
        <div key={ticket.name} className="flex justify-between items-center w-full p-5 font-bold bg-gray-50">
            <div className="flex gap-4">
                <span className="w-1 min-h-full rounded-full border-2 border-black bg-black" />
                <div className="flex gap-4 w-fit py-2 h-full">
                    <p>{ticket.name}</p>
                    <User className="w-6 h-6" />
                </div>
            </div>
            <div className="flex gap-10">
                {mode === 'edit' && (
                    <Fragment>
                        <Button className="flex gap-2 w-fit h-full text-inherit bg-inherit">
                            <Pencil className="w-5 h-5" />
                            <p>Edit</p>
                        </Button>
                        <Button className="flex gap-2 w-fit h-full text-inherit bg-inherit">
                            <TrashCan className="w-5 h-5" />
                            <p>Delete</p>
                        </Button>
                    </Fragment>
                )}
                <Button className="flex gap-2 w-fit h-full text-inherit bg-inherit">
                    <Eye className="w-5 h-5" />
                    <p>Show</p>
                </Button>
            </div>
        </div>
    );
};

export default TicketType;
