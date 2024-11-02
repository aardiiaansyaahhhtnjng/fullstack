import { test, expect } from '@playwright/test';

test('API POST - add user', async({request}) => {
    const response = await request.post('http://localhost:5000/users', {
        data: {
            "name": "Rojiah",
            "email": "roji@gmail.com",
            "password": "roji123",
            "confPassword": "roji123",
            "role": "user"
        }
    });
    expect(response.status()).toBe(201);
})

test('login', async({ page }) => {
    await page.goto('http://localhost:3000');
    const response = await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('user tidak ditemukan')).toBeVisible();
})

test('list', async({ page }) => {
    await page.goto('http://localhost:3000');

})