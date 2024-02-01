import { type FunctionComponent, type HTMLAttributes, type KeyboardEvent, type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useMapEvent } from 'react-leaflet';
import type { Map, LatLngLiteral, Marker } from 'leaflet';
import { useMutationRequest } from '@/lib/hooks';
import { locationAPI } from '@/lib/api/location';
import { cn } from '@/lib/utils';
import { Location } from '@components/ui/icons';
import InputWrapper, { type InputWrapperProps } from './input-wrapper';

const MapComponent = dynamic(() => import('@components/ui/map'), { ssr: false });

interface LocationInputProps extends HTMLAttributes<HTMLInputElement>, InputWrapperProps {
    name: HTMLInputElement['name'];
    value?: HTMLInputElement['value'];
    placeholder?: HTMLInputElement['placeholder'];
    onChange?: HTMLAttributes<HTMLInputElement>['onChange'];
    className?: HTMLAttributes<HTMLInputElement>['className'];
    register?: UseFormRegisterReturn;
    disabled?: HTMLInputElement['disabled'];
    enableMap: boolean;
}

const MAP_DEFAULT_ZOOM = 12;
const MAP_DEFAULT_CENTER: LatLngLiteral = { lat: 6.3722961, lng: 2.3137762 };

const LocationInput: FunctionComponent<LocationInputProps> = ({ name, placeholder, className, onChange, enableMap, ...props }) => {
    const [position, setPosition] = useState<LatLngLiteral>(MAP_DEFAULT_CENTER);
    const [map, setMap] = useState<Map | null>(null);
    const markerRef = useRef<Marker | null>(null);
    
    const { trigger: fetchCoordinates, data: valueCoordinates } = useMutationRequest(
        (enableMap && props.value) ? `${props.value}-coordinates` : null,
        async () => {
            const response = await locationAPI.getCoordinatesByAddress({ address: props.value! });
            
            if (!response.data.success) {
                throw new Error(response.data.error.message);
            }
            
            return response.data;
        },
    );
    
    const { trigger: fetchAddress, data: valueAddress } = useMutationRequest(
        enableMap ? `${position.lat}-${position.lng}-address` : null,
        async (_: string, { arg: coords }: { arg: LatLngLiteral }) => {
            const response = await locationAPI.getAddressesByCoordinates(
                { latitude: coords.lat, longitude: coords.lng }
            );
            
            if (!response.data.success) {
                throw new Error(response.data.error.message);
            }
            
            return response.data;
        },
    );
    
    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchCoordinates();
        }
    };
    
    const handleMarkerMove = async (newCoords: LatLngLiteral) => {
        await fetchAddress(newCoords);
        
        if (valueAddress?.success) {
            onChange && onChange(
                { target: { value: valueAddress.data[0] } } as unknown as ChangeEvent<HTMLInputElement>
            );
        }
        
        setPosition(newCoords);
    };
    
    useEffect(() => {
        if (valueCoordinates?.success) {
            const { latitude, longitude } = valueCoordinates.data;
            setPosition({ lat: latitude, lng: longitude });
            map?.setView({ lat: latitude, lng: longitude }, MAP_DEFAULT_ZOOM);
        }
    }, [valueCoordinates]);
    
    useEffect(() => {
        if (props.value && enableMap) {
            fetchCoordinates();
        }
    }, []);
    
    const MapClickHandler = () => {
        const handledMap = useMapEvent('click', async (event) => {
            await handleMarkerMove(event.latlng);
        });
        
        handledMap.setView(position);
        
        useEffect(() => {
            setMap(handledMap);
        }, []);
        
        return null;
    };
    
    const markerHandlers = useMemo(() => ({
        dragend: async () => {
            if (!markerRef.current) return;
        }
    }), []);
    
    return (
        <InputWrapper
            label={props.label}
            name={name}
            iconPosition="left"
            trailing={props.trailing}
            labelClassName={props.labelClassName}
            iconClassName={cn('top-3.5', props.iconClassName)}
            icon={<Location className="w-5 h-5"/>}
            errors={props.errors}
        >
            <input
                id={name}
                type="text"
                autoComplete="address-level4"
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={!props.register ? (props.value ?? '') : undefined}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                defaultValue={props.defaultValue}
                onKeyDown={handleKeyDown}
                {...props.register}
                className={cn('w-full rounded-full pl-12 py-2 h-10 bg-gray-100 focus:outline-none ring-transparent', className)}
            />
            {
                (enableMap && typeof window !== 'undefined') && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col w-full">
                        <p className="my-2.5 text-sm text-gray-500">
                            {
                                props.value !== '' && 'Press "Enter" to go to location'
                            }
                        </p>
                        <div className="w-full aspect-video">
                            <MapComponent
                                value={props.value ?? ''}
                                position={position}
                                zoom={MAP_DEFAULT_ZOOM}
                                markerRef={markerRef}
                                markerHandlers={markerHandlers}
                                clickHandler={MapClickHandler}
                            />
                        </div>
                    </div>
                )
            }
        </InputWrapper>
    );
};

export default LocationInput;
