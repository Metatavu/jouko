import { Home } from '../components/Home';
import * as request from 'supertest';

// Test that the homepage loads without error
test('renders homepage without error', async () => {
    const app = request(Home);
    const response = await app.get('/');
    expect(response.status).toBe(200);
}
);

export default {};