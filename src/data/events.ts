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
        startDate: getDaysFromToday(),
        cover: 'image_3.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                name: 'VVIP Pass',
                quantity: 5,
                kind: 'paid',
                price: 3500,
                currency: 'XOF',
            },
        ],
    },
    {
        id: '5ec292ee-f057-488d-8cb0-6be5da4df2b7',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'AfricaTech 2023: Digitalisation and e-commerce',
        startDate: getDaysFromToday(3),
        cover: 'image_2.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                name: 'VVIP Pass',
                quantity: 5,
                kind: 'paid',
                price: 3500,
                currency: 'XOF',
            },
        ],
    },
    {
        id: '77f8f194-0b2b-4a00-8128-a73ee315670c',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'AfricaTech 2023: Digitalisation and e-commerce',
        startDate: getDaysFromToday(10),
        cover: 'image_3.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                name: 'VVIP Pass',
                quantity: 5,
                kind: 'paid',
                price: 3500,
                currency: 'XOF',
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
        startDate: getDaysFromToday(60),
        cover: 'image_1.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        tags: ['Tech', 'Digital', 'E-commerce'],
        ticketTypes: [
            {
                name: 'VVIP Pass',
                quantity: 5,
                kind: 'paid',
                price: 3500,
                currency: 'XOF',
            },
        ],
    },
];

export default events;
