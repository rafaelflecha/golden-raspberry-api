import request from 'supertest';
import app from '../../src/app';
import { initDb } from '../../src/config/database';
import { ProducerAward } from '../../src/models/movie.model';

beforeAll(async () => {
    await initDb();
});

describe('Golden Raspberry Awards API', () => {
    test('GET /api/producers/award-intervals should return min and max intervals', async () => {
        const response = await request(app)
            .get('/api/producers/award-intervals')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('min');
        expect(response.body).toHaveProperty('max');

        if (response.body.min.length > 0) {
            response.body.min.forEach((item: ProducerAward) => {
                expect(item).toHaveProperty('producer');
                expect(item).toHaveProperty('interval');
                expect(item).toHaveProperty('previousWin');
                expect(item).toHaveProperty('followingWin');

                expect(item.interval).toBe(response.body.min[0].interval);

                expect(item.interval).toBe(item.followingWin - item.previousWin);
            });
        }

        if (response.body.max.length > 0) {
            response.body.max.forEach((item: ProducerAward) => {
                expect(item).toHaveProperty('producer');
                expect(item).toHaveProperty('interval');
                expect(item).toHaveProperty('previousWin');
                expect(item).toHaveProperty('followingWin');

                expect(item.interval).toBe(response.body.max[0].interval);

                expect(item.interval).toBe(item.followingWin - item.previousWin);
            });
        }

        if (response.body.min.length > 0 && response.body.max.length > 0) {

            const minInterval = response.body.min[0].interval;
            const maxInterval = response.body.max[0].interval;

            expect(minInterval).toBeLessThanOrEqual(maxInterval);
        }
    });

    test('GET /api/producers/award-intervals returns consistent data from the standard CSV', async () => {
        
        const expectedResponse = {
            min: [
                {
                    producer: 'Joel Silver',
                    interval: 1,
                    previousWin: 1990,
                    followingWin: 1991
                }
            ],
            max: [
                {
                    producer: 'Matthew Vaughn',
                    interval: 13,
                    previousWin: 2002,
                    followingWin: 2015
                }
            ]
        };

        const response = await request(app)
            .get('/api/producers/award-intervals')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(expectedResponse);
    });
});