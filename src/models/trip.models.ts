export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Location extends Coordinates {
    time: number;
    address: string;
}

export interface BoundingBox extends Coordinates {}

export interface Trip {
    id: string;
    start: Location;
    end: Location;
    distance: number;
    duration: number;
    overspeedsCount: number;
    boundingBox: BoundingBox[];
    durationByStartAndEndTime?: string;
}

export interface TripQuery {
    start_gte?: number;
    start_lte?: number;
    distance_gte?: number;
    limit?: number;
    offset?: number;
}