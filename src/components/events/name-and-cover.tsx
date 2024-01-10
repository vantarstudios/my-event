import { Fragment, type FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from '@/lib/utils';
import { EventCategory } from '@/types/constants';
import { createEventSchema, type CreateEventPayload } from '@/types/events';
import type { EventCategoryUnion } from '@/types';
import CategoryChip from './category-chip';
import { Button } from '@components/ui/buttons';
import { TitledTextArea, TitledArea } from '@components/ui/layouts';
import CoverInput from './cover-input';

type NameAndCoverProps = Partial<Pick<CreateEventPayload, 'cover' | 'title' | 'description' | 'categories'>>

interface EditNameAndCoverProps extends NameAndCoverProps {
    initialCover?: string;
    setOtherData: <T extends keyof CreateEventPayload>(key: T) => (value: CreateEventPayload[T]) => void;
}

const NameAndCover: FunctionComponent<EditNameAndCoverProps> = ({ title, cover, description, categories, initialCover, setOtherData }) => {
    const { register } = useForm({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            title,
            description,
        },
    });
    
    const suggestedCategories = categories && categories.length > 0
        ? Object.values(EventCategory).filter((category) => !categories.includes(category))
        : Object.values(EventCategory);

    const handleSuggestedCategoryClick = (category: EventCategoryUnion) => () => {
        setOtherData('categories')([...(categories || []), category]);
    };
    
    const handleCategoryDelete = (deletedCategory: EventCategoryUnion) => () => {
        setOtherData('categories')((categories || []).filter((category) => category !== deletedCategory));
    };

    return (
        <div className="flex gap-5 w-full flex-1">
            <CoverInput
                initialCover={initialCover}
                cover={cover}
                setCoverData={setOtherData('cover')}
            />
            <div className="flex flex-col justify-start gap-5 w-2/3 h-full px-5">
                <TitledTextArea
                    register={register('title', {
                        required: 'Event title is required',
                        onChange: (event) => setOtherData('title')(event.target.value),
                    })}
                    title="Event title:"
                    value={title}
                    placeholder="Enter your event title"
                    rows={1}
                    maxLength={150}
                    className=""
                />
                <TitledTextArea
                    register={register('description', {
                        required: 'Event description is required',
                        onChange: (event) => setOtherData('description')(event.target.value),
                    })}
                    value={description}
                    title="Description:"
                    placeholder="Briefly describe your event to your participants"
                    maxLength={700}
                    rows={7}
                />
                <TitledArea title="Category:">
                    <div className="flex flex-col items-start gap-5 w-full">
                        <div
                            className="flex flex-wrap items-center gap-2 min-w-[50%] max-w-full min-h-[2.5rem] px-5 py-1 rounded-xl bg-gray-100">
                            {
                                (!categories || categories.length === 0) && (
                                    <p className="text-gray-500">No category selected</p>
                                )
                            }
                            {
                                categories && categories.map((category, index) => (
                                    <Fragment key={category}>
                                        <CategoryChip
                                            category={category}
                                            onDelete={handleCategoryDelete(category)}
                                            deletable
                                        />
                                        {index < categories.length - 1 && <span>-</span>}
                                    </Fragment>
                                ))
                            }
                        </div>
                        <div className="flex flex-wrap justify-start gap-x-5 gap-y-3 w-full h-28 py-2 pr-2 overflow-y-auto">
                            {suggestedCategories.map((category) => (
                                <Button
                                    key={category}
                                    onClick={handleSuggestedCategoryClick(category)}
                                    className="flex items-center min-w-max px-3 h-8 text-sm"
                                >
                                    #{capitalize(category)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </TitledArea>
            </div>
        </div>
    );
};

export default NameAndCover;
