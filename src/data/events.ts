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
        type: 'LIVE',
        startingDate: getDaysFromToday(),
        endingDate: getDaysFromToday(),
        country: 'BJ',
        status: 'PUBLISHED',
        attendeesCount: 0,
        followersCount: 0,
        isPrivate: false,
        likesCount: 0,
        cover: 'image_1.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        categories: ['SPORT', 'ENTERTAINMENT'],
        createdAt: '2023-10-11T12:00:00.000Z',
        updatedAt: '2023-10-11T12:00:00.000Z',
    },
    {
        id: '5ec292ee-f057-488d-8cb0-6be5da4df2b7',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'AfricaTech 2023: Digitalisation and e-commerce',
        type: 'ONLINE',
        startingDate: getDaysFromToday(3),
        endingDate: getDaysFromToday(4),
        country: 'BJ',
        status: 'PUBLISHED',
        attendeesCount: 0,
        followersCount: 0,
        isPrivate: false,
        likesCount: 0,
        cover: 'image_2.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        categories: ['CONCERT', 'CULTURE', 'LIVE_PERFORMANCE'],
        createdAt: '2023-10-11T12:00:00.000Z',
        updatedAt: '2023-10-11T12:00:00.000Z',
    },
    {
        id: '77f8f194-0b2b-4a00-8128-a73ee315670c',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc. Donec euismod, nisl eget fermentum aliquam, elit nunc aliquet nunc, vitae aliquam nisi nunc eget nunc.',
        title: 'AfricaTech 2023: Digitalisation and e-commerce',
        type: 'LIVE',
        startingDate: getDaysFromToday(10),
        endingDate: getDaysFromToday(17),
        country: 'BJ',
        status: 'POSTPONED',
        attendeesCount: 0,
        followersCount: 0,
        isPrivate: false,
        likesCount: 0,
        cover: 'image_3.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        categories: ['TECHNOLOGY', 'HACKATHON', 'ESPORT'],
        createdAt: '2023-10-11T12:00:00.000Z',
        updatedAt: '2023-10-11T12:00:00.000Z',
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
        type: 'LIVE',
        startingDate: getDaysFromToday(60),
        endingDate: getDaysFromToday(62),
        country: 'BJ',
        status: 'NOT_PUBLISHED',
        attendeesCount: 0,
        followersCount: 0,
        isPrivate: false,
        likesCount: 0,
        cover: 'image_1.png',
        location: 'Continental Hotel, Victoria Island, Lagos, Nigeria',
        categories: ['POLITIC', 'SEMINAR'],
        createdAt: '2023-10-11T12:00:00.000Z',
        updatedAt: '2023-10-11T12:00:00.000Z',
    },
];

export default events;
