export interface Movie {
    id?: number;
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: string;
}

export interface ProducerAward {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface AwardsIntervals {
    min: ProducerAward[];
    max: ProducerAward[];
}