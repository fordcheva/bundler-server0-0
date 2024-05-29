import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import FastifyRawBody from 'fastify-raw-body';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IS_DEVELOPMENT, IS_PRODUCTION } from './common/common-types';
import { initializeBundlerConfig } from './configs/bundler-common';
import { LarkService } from './modules/common/services/lark.service';
import { Helper } from './common/helper';
import Mongoose from 'mongoose';
import { INestApplication, INestApplicationContext } from '@nestjs/common';
import { canRunCron } from './modules/rpc/aa/utils';
import Axios from 'axios';
import * as http from 'http';
import * as https from 'https';

Axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
Axios.defaults.httpAgent = new http.Agent({ keepAlive: true });

async function bootstrap() {
    await initializeBundlerConfig();

    if (canRunCron() && !IS_DEVELOPMENT) {
        const app = await NestFactory.createApplicationContext(AppModule, {
            logger: IS_DEVELOPMENT ? ['error', 'warn', 'log', 'debug', 'verbose'] : false,
        });
        initApp(app);
        return;
    }

    const fastifyAdapter = new FastifyAdapter({ ignoreTrailingSlash: true });
    fastifyAdapter.register(FastifyRawBody as any, {
        field: 'rawBody',
        routes: ['/rpc', '/'],
    });

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
    app.enableCors({
        origin: '*',
        maxAge: 86400,
    });

    initApp(app);

    const configService = app.get(ConfigService);
    const larkService = app.get(LarkService);
    const server = await app.listen({
        port: 3001,
        host: '0.0.0.0',
        backlog: 1024,
    } as any);

    if (!IS_DEVELOPMENT) {
        process.on('uncaughtException', async (error) => {
            // nothing
        });

        process.on('SIGINT', (signal: any) => {
            process.env.DISABLE_TASK = '1';

            server.close(async (error: any) => {
                const nodeInstanceId = configService.get('NODE_APP_INSTANCE');
                const err = { error, signal, nodeInstanceId };
                await larkService.sendMessage(Helper.converErrorToString(err), `Server Close`);

                if (error) {
                    process.exit(1);
                }
            });

            setTimeout(
                () => {
                    console.log('2s closed');
                    process.exit(0);
                },
                IS_PRODUCTION ? 2000 : 0,
            );
        });
    }
}

function initApp(app: INestApplication | INestApplicationContext) {
    Mongoose.set('debug', IS_DEVELOPMENT);
    const larkService = app.get(LarkService);

    if (process.env.LARK_NOTICE_URL) {
        larkService.sendMessage(`Particle Bundler Server Started, ENVIRONMENT: ${process.env.ENVIRONMENT}`);
    }
}

bootstrap();
