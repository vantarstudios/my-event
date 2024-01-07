import type { FunctionComponent } from 'react';
import type { IconProps } from '@/types';

const Instagram: FunctionComponent<IconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="currentColor"
            className={className}
        >
            <path d="M17.7081 2.08315C19.0883 2.08727 20.4108 2.63737 21.3867 3.61329C22.3626 4.58922 22.9127 5.91169 22.9169 7.29185V17.7081C22.9127 19.0883 22.3626 20.4108 21.3867 21.3867C20.4108 22.3626 19.0883 22.9127 17.7081 22.9169H7.29185C5.91169 22.9127 4.58922 22.3626 3.61329 21.3867C2.63737 20.4108 2.08727 19.0883 2.08315 17.7081V7.29185C2.08727 5.91169 2.63737 4.58922 3.61329 3.61329C4.58922 2.63737 5.91169 2.08727 7.29185 2.08315H17.7081ZM17.7081 0H7.29185C3.28125 0 0 3.28125 0 7.29185V17.7081C0 21.7188 3.28125 25 7.29185 25H17.7081C21.7188 25 25 21.7188 25 17.7081V7.29185C25 3.28125 21.7188 0 17.7081 0Z"/>
            <path d="M19.2706 7.29187C18.9616 7.29187 18.6595 7.20023 18.4026 7.02854C18.1456 6.85685 17.9453 6.61282 17.8271 6.32731C17.7088 6.0418 17.6779 5.72764 17.7382 5.42454C17.7985 5.12145 17.9473 4.84304 18.1658 4.62452C18.3843 4.406 18.6627 4.25718 18.9658 4.19689C19.2689 4.1366 19.5831 4.16755 19.8686 4.28581C20.1541 4.40407 20.3981 4.60434 20.5698 4.86129C20.7415 5.11824 20.8331 5.42034 20.8331 5.72937C20.8336 5.93468 20.7935 6.13806 20.7151 6.32784C20.6367 6.51761 20.5217 6.69003 20.3765 6.83521C20.2313 6.98039 20.0589 7.09546 19.8691 7.17383C19.6793 7.2522 19.476 7.29231 19.2706 7.29187ZM12.5 8.33317C13.3241 8.33317 14.1297 8.57755 14.815 9.03541C15.5002 9.49327 16.0343 10.144 16.3497 10.9054C16.6651 11.6668 16.7476 12.5046 16.5868 13.3129C16.426 14.1212 16.0292 14.8637 15.4464 15.4464C14.8637 16.0292 14.1212 16.426 13.3129 16.5868C12.5046 16.7476 11.6668 16.6651 10.9054 16.3497C10.144 16.0343 9.49325 15.5002 9.03539 14.815C8.57753 14.1298 8.33315 13.3241 8.33315 12.5C8.33433 11.3953 8.77372 10.3361 9.5549 9.55491C10.3361 8.77373 11.3952 8.33435 12.5 8.33317ZM12.5 6.25002C11.2639 6.25002 10.0555 6.61657 9.02769 7.30333C7.99988 7.99009 7.1988 8.96621 6.72576 10.1082C6.25271 11.2503 6.12894 12.507 6.37009 13.7193C6.61125 14.9317 7.20651 16.0454 8.08059 16.9194C8.95466 17.7935 10.0683 18.3888 11.2807 18.6299C12.4931 18.8711 13.7497 18.7473 14.8918 18.2743C16.0338 17.8012 17.0099 17.0001 17.6967 15.9723C18.3834 14.9445 18.75 13.7362 18.75 12.5C18.75 10.8424 18.0915 9.2527 16.9194 8.0806C15.7473 6.9085 14.1576 6.25002 12.5 6.25002Z"/>
        </svg>
    );
};

export default Instagram;
