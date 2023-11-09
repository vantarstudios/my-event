import type { NextPage } from 'next';
import type { Event } from '@/types';

interface DashboardEditEventPageProps {
    params: { id: Event['id'] };
}

const DashboardEditEventPage: NextPage<DashboardEditEventPageProps> = ({ params }) => {
    return <div>{params.id}</div>;
};

export default DashboardEditEventPage;
