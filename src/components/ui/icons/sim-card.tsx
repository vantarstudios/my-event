import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const SimCard: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentColor"
            className={className}
        >
            <path
                d="M64 0H242.7c17 0 33.3 6.7 45.3 18.7L365.3 96c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0zM96 192c-17.7 0-32 14.3-32 32v32h64V192H96zM64 352h80 96 80V288H240 144 64v64zM320 224c0-17.7-14.3-32-32-32H256v64h64V224zM160 192v64h64V192H160zM288 448c17.7 0 32-14.3 32-32V384H256v64h32zM160 384v64h64V384H160zM64 416c0 17.7 14.3 32 32 32h32V384H64v32z"/>
        </svg>
    );
};

export default SimCard;
