import { AwardsIntervals, ProducerAward } from "../models/movie.model";
import { MovieRepository } from "../repositories/movieRepository";

export class ProducerService {
    private movieRepository: MovieRepository;

    constructor() {
        this.movieRepository = new MovieRepository();
    }

    getProducerAwardIntervals(): AwardsIntervals {
        const producerWins = this.movieRepository.getWinnersByProducer();
        const intervals: ProducerAward[] = [];

        producerWins.forEach((years, producer) => {

            years.sort((a, b) => a - b);
            const uniqueYears = [...new Set(years)];

            if (uniqueYears.length < 2) {
                return;
            }

            for (let i = 0; i < uniqueYears.length - 1; i++) {
                const interval = uniqueYears[i + 1] - uniqueYears[i];

                if (interval > 0) {
                    intervals.push({
                        producer,
                        interval: interval,
                        previousWin: uniqueYears[i],
                        followingWin: uniqueYears[i + 1]
                    });
                }
            }
        });

        if (intervals.length === 0) {
            return { min: [], max: [] };
        }

        let minInterval = Number.MAX_SAFE_INTEGER;
        let maxInterval = 0;

        intervals.forEach(item => {
            minInterval = Math.min(minInterval, item.interval);
            maxInterval = Math.max(maxInterval, item.interval);
        });

        const minIntervals = intervals.filter(item => item.interval === minInterval);
        const maxIntervals = intervals.filter(item => item.interval === maxInterval);

        return {
            min: minIntervals,
            max: maxIntervals
        };
    }
}
