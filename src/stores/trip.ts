import { defineStore } from "pinia";
import { Trip, TripQuery } from "@/models/trip.models";
import axios from "axios";


type TripState = {
    loading: boolean;
    trips: Trip[];
    error: string | null;
}

function calculateDuration(startTime: number, endTime: number) {
    const duration = endTime - startTime;
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
}
export const useTripStore = defineStore({
    id: 'trip',
    state: (): TripState => ({
        loading: false,
        trips: [],
        error: null,
    }),
    actions: {
        async fetchTrips(filters: TripQuery) {
            this.$patch({
                error: null,
                loading: true,
            });
            try {
                const response = await axios.get<Trip[]>(`${import.meta.env.VITE_API_URL}/trips?limit=20&offset=0`, { params: filters });
                const tripsWithDuration = response.data.map(trip => ({
                    ...trip,
                    durationByStartAndEndTime: calculateDuration(trip.start.time, trip.end.time),
                }));
                this.$patch({
                    trips: tripsWithDuration,
                    error: null,
                    loading: false,
                });
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Error';
            } finally {
                this.loading = false;
            }
        },
        async createRandomTrip() {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/trips/random`);
                await this.fetchTrips({});
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Error';
            }
        }
    }
})