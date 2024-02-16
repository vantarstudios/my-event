'use client';

import { useState, type FunctionComponent, type ReactNode } from 'react';
import { imagesPlaceholder } from '@/data/images-placeholder';
import type { Event } from '@/types';
import { ImageWithFallback } from '@components/ui';
import { Modal } from '@components/ui/layouts';

interface EventCardModalProps {
    title?: Event['title'];
    cover: Event['cover'];
    format: 'titled' | 'unconstrained';
    cardImage: ReactNode;
}

const EventCardModal: FunctionComponent<EventCardModalProps> = ({ title, cover, format, cardImage }) => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div
            onClick={() => setShowModal(true)}
            className="w-full h-full cursor-default"
        >
            {cardImage}
            <Modal isOpened={showModal}>
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowModal(false);
                    }}
                    className="w-full h-full flex justify-center items-center cursor-pointer"
                >
                    <div className="relative w-3/4 aspect-video">
                        <ImageWithFallback
                            src={cover.url}
                            alt={title || 'Event cover'}
                            width={format === 'titled' ? 250 : undefined}
                            height={format === 'titled' ? 170 : undefined}
                            fill={format === 'unconstrained'}
                            quality={100}
                            sizes="100%, 100%"
                            placeholder={imagesPlaceholder}
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EventCardModal;
