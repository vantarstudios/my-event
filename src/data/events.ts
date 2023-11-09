import { v4 as uuid4 } from 'uuid';
import type { Event } from '@/types';

const events: Event[] = [
    {
        id: uuid4(),
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_1.png',
    },
    {
        id: uuid4(),
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_2.png',
    },
    {
        id: uuid4(),
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_3.png',
    },
    {
        id: uuid4(),
        title: '1v1 King of court',
        date: { day: 7, month: 'Oct' },
        image: '/images/image_3.png',
    },
];

export default events;
