import { Home } from '../components/Home';
import supertest from 'supertest';

// Test that the homepage loads without error
test('Homepage loads without error', async () => {
    const app = await supertest(Home);
    const response = await app.get('/');
    expect(response.status).toBe(200);
}
,    10000);

export default {};