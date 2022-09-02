import dotenv from 'dotenv';

async function bootstrap() {
    dotenv.config();
    const { start } = await import('./anaithsnail.js');
    await start();
}

await bootstrap();
