import { Loader } from '@googlemaps/js-api-loader';
import { clientEnv } from '@/lib/utils/env';

type GoogleMaps = typeof google.maps;

type GoogleMap = google.maps.Map;

type Geocoder = google.maps.Geocoder;

type PlacesService = google.maps.places.PlacesService;

type Place = google.maps.places.PlaceResult;

type Position = {
    latitude: google.maps.LatLngLiteral['lat'];
    longitude: google.maps.LatLngLiteral['lng'];
};

class Map {
    private readonly loader = new Loader({
        apiKey: clientEnv.GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['maps', 'geocoding', 'places']
    });
    private readonly defaultPosition: Position = {
        latitude: 0,
        longitude: 0,
    };
    
    private map: GoogleMap | null = null;
    private googleMaps: GoogleMaps | null = null;
    private geocoder: Geocoder | null = null;
    private placesService: PlacesService | null = null;
    private position: Position = this.defaultPosition;
    
    constructor() {
        this.init()
            .then()
            .catch(() => {});
    }
    
    private async init() {
        await this.loader.importLibrary('maps');
        
        if (!window.google) {
            return;
        }
        
        this.googleMaps = window.google.maps;
        this.geocoder = new this.googleMaps.Geocoder();
        this.position = await this.getGeolocation();
    }
    
    public createMap(element: HTMLElement) {
        if (!this.googleMaps) {
            return;
        }
        
        this.map = new this.googleMaps!.Map(element, {
            center: { lat: this.position.latitude, lng: this.position.longitude },
            zoom: 15,
        });
        
        this.createMarker(this.position)
        
        this.placesService = new this.googleMaps.places.PlacesService(this.map);
    }
    
    public createMarker(position: Position, title?: string) {
        if (!this.googleMaps) {
            return;
        }

        const marker = new this.googleMaps.Marker({
            position: { lat: position.latitude, lng: position.longitude, },
            map: this.map,
            draggable: true,
            title,
        });
        
        marker.addListener('dragend', async () => {
            const position = marker.getPosition();
            
            if (!position) {
                return;
            }
            
            this.position = {
                latitude: position.lat(),
                longitude: position.lng(),
            };
            
            this.map?.setCenter(position);
        });
    }
    
    private async getGeolocation() {
        if (!navigator.geolocation) {
            return Promise.resolve(this.defaultPosition);
        }
        
        return new Promise<Position>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                }
            );
        });
    }
    
    public async getAddressFromPosition(position: Position) {
        if (!this.geocoder) {
            return Promise.resolve('');
        }
        
        return new Promise<string>((resolve, reject) => {
            this.geocoder!.geocode(
                { location: { lat: position.latitude, lng: position.longitude } },
                (results, status) => {
                    if (status !== 'OK') {
                        reject(status);
                    }
                    
                    if (!results || results.length === 0) {
                        reject('No results');
                    }
                    
                    resolve(results![0]?.formatted_address ?? '');
                }
            );
        });
    }
    
    public async getPlacesFromQuery(query: string) {
        if (!this.placesService) {
            return Promise.resolve([]);
        }
        
        return new Promise<Place[]>((resolve, reject) => {
            this.placesService!.findPlaceFromQuery(
                {
                    query,
                    fields: ['name', 'geometry'],
                },
                (results, status) => {
                    if (status !== 'OK') {
                        reject(status);
                    }
                    
                    if (!results || results.length === 0) {
                        reject('No results');
                    }
                    
                    resolve(results ?? []);
                }
            );
        });
    }
}

const map = new Map();

export { map };
