import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import Database from 'better-sqlite3';
import { Movie } from '../models/movie.model';


let db: Database.Database;

export function initDb(): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            db = new Database(':memory:');

            db.exec(`
                CREATE TABLE IF NOT EXISTS movies (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    year INTEGER,
                    title TEXT,
                    studios TEXT,
                    producers TEXT,
                    winner TEXT
                );
            `);

            const movies: Movie[] = [];
            const csvPath = path.join(__dirname, '../../data/movielist.csv');

            if (!fs.existsSync(csvPath)) {
                return reject(new Error(`CSV file not found: ${csvPath}`));
            }

            fs.createReadStream(csvPath)
                .pipe(csvParser({
                    separator: ';',
                    mapHeaders: ({ header }) => header.trim(),
                    mapValues: ({ value }) => value.trim(),
                }))
                .on('data', (data: Movie) => {
                    movies.push(data)
                })
                .on('end', () => {
                    const insert = db.prepare(`
                        INSERT INTO movies (year, title, studios, producers, winner)
                        VALUES (?, ?, ?, ?, ?);
                    `);

                    const insertMany = db.transaction((movies: Movie[]) => {
                        for (const movie of movies) {

                            const year = movie.year;

                            if (isNaN(year)) {
                                console.error(`Invalid year: ${movie.year}`);
                                continue;
                            }

                            const winner = (movie.winner || '').toLowerCase() === 'yes' ? 'yes' : 'no';

                            insert.run(year, movie.title, movie.studios, movie.producers, winner);
                        }
                    });

                    try {
                        insertMany(movies);
                        console.log(`Successfully loaded ${movies.length} movies from CSV`);
                        resolve();

                    } catch (error) {
                        console.error('Error during database insert:', error);
                        reject(error);
                    }
                })
                .on('error', (error: Error) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                });
        } catch (error) {
            console.error('Unexpected error:', error);
            reject(error);
        }
    });
}


export function getDb(): Database.Database {
    if (!db) {
        throw new Error('Database not initialized. Call initDb() first.');
    }
    return db;
}
