import type { Event } from '@/types';

const getDaysFromToday = (n?: number): string => {
    return new Date(Date.now() + 3600 * 1000 * 24 * (n ?? 0)).toISOString();
};

const events: Event[] = [
    {
        id: '9134f380-cd01-4e9a-8709-42d0400a8df1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'NBA Party',
        type: 'live',
        startDate: getDaysFromToday(),
        cover: 'image_3.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        currency: 'XOF',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                title: 'VVIP Pass',
                quantity: 5,
                types: ['paid'],
                price: 3500,
                groupTicket: false,
            },
        ],
    },
    {
        id: '5ec292ee-f057-488d-8cb0-6be5da4df2b7',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'AfricaTech 2023: Digitalisation and e-commerce',
        type: 'live',
        startDate: getDaysFromToday(3),
        cover: 'image_2.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        currency: 'XOF',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                title: 'VVIP Pass',
                quantity: 5,
                types: ['paid'],
                price: 3500,
                groupTicket: false,
            },
        ],
    },
    {
        id: '77f8f194-0b2b-4a00-8128-a73ee315670c',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'AfricaTech 2023: Digitalisation and e-commerce',
        type: 'live',
        startDate: getDaysFromToday(10),
        cover: 'image_3.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        currency: 'XOF',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                title: 'VVIP Pass',
                quantity: 5,
                types: ['free'],
                price: 3500,
                groupTicket: false,
            },
        ],
    },
    {
        id: '849d145a-22be-4b39-9148-242c2c9c662b',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum ' +
            'aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget ' +
            'fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Lorem ipsum dolor ' +
            'sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc ' +
            'aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, ' +
            'elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'AfricaTech 2023: Digitalisation and e-commerce',
        type: 'live',
        startDate: getDaysFromToday(60),
        cover: 'image_1.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        currency: 'XOF',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                title: 'VVIP Pass',
                quantity: 5,
                types: ['paid'],
                price: 3500,
                groupTicket: false,
            },
        ],
    },
];

export default events;
