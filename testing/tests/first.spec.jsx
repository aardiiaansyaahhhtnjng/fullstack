import { test, expect } from '@playwright/test';

//positive login
test('API POST - positive login', async({request}) => {
    const response = await request.post('http://localhost:5000/login', {
        data: {
            'email': 'admin@gmail.com',
            'password': 'admin'
        }
    });
    expect(response.status()).toBe(200);
})

//negative login
test('API POST - wrong password when login', async({request}) => {
    const response = await request.post('http://localhost:5000/login', {
        data: {
            'email': 'admin@gmail.com',
            'password': 'wrong_pass'
        }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.msg).toBe('Wrong Password');
})

test('API POST - undefined user when login', async({request}) => {
    const response1 = await request.post('http://localhost:5000/login', {
        data: {
            'email': 'adminadmin@gmail.com',
            'password': 'wrong_pass'
        }
    });

    const response2 = await request.post('http://localhost:5000/login', {
        data: {
            'email': '',
            'password': ''
        }
    });

    const response3 = await request.post('http://localhost:5000/login', {
        data: {
            'email': 'adminadmin@gmail.com',
            'password': ''
        }
    });
    const response = response1 || response2 || response3;
    expect(response.status()).toBe(404);
    const body = await (response).json();
    expect(body.msg).toBe('user tidak ditemukan');
})