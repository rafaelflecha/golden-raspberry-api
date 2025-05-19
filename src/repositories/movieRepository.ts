import { getDb } from "../config/database";
import { Movie } from "../models/movie.model";
import { splitProducers } from "../utils/producerUtils";

export class MovieRepository {

    getAllMovies(): Movie[] {
        const db = getDb();
        return db.prepare('SELECT * FROM movies').all() as Movie[];
    }

    getWinnersByProducer(): Map<string, number[]> {
        const db = getDb();
        const winners = db.prepare(`
            SELECT producers, year FROM movies
            WHERE winner = 'yes'
            ORDER BY year ASC
            `).all();

        console.log(winners);
        const producerWins = new Map<string, number[]>();
        
        (winners as Movie[]).forEach((movie: Movie) => {
            const producers = splitProducers(movie.producers);
            const year = movie.year;

            producers.forEach(producer => {

                if (!producerWins.has(producer)) { 
                    producerWins.set(producer, []);
                }
                
                const wins = producerWins.get(producer);

                if (wins) {
                    wins.push(year);
                }
            });
        });

        const mappedWinners = new Map([...producerWins.entries()].filter(([years]) => years.length >= 2));
        console.log(mappedWinners);
        return mappedWinners;
    }
}
