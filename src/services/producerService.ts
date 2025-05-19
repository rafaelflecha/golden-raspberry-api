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

            for (let i = 0; i < years.length - 1; i++) {
                intervals.push({
                    producer,
                    interval: years[i + 1] - years[i],
                    previousWin: years[i],
                    followingWin: years[i + 1]
                });
            }
        });
        
        console.log(intervals);

        let minInterval = Number.MAX_SAFE_INTEGER;
        let maxInterval = 0;

        intervals.forEach(interval => {
            minInterval = Math.min(minInterval, interval.interval);
            maxInterval = Math.max(maxInterval, interval.interval);
        });

        const minIntervals = intervals.filter(interval => interval.interval === minInterval);
        const maxIntervals = intervals.filter(interval => interval.interval === maxInterval);

        return {
            min: minIntervals, 
            max: maxIntervals
        };
    }
}
