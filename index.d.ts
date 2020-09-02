import amqpClient, { Connection, Channel } from 'amqplib/callback_api';
import fastify, { FastifyPlugin } from 'fastify';

declare namespace fastifyAmqp {
  interface FastifyAmqpConnObject extends Connection {}

  interface FastifyAmqpChannelObject extends Channel {}

  interface FastifyAmqpOptions {
    /**
     * Host of connection
     */
    host: string;
    /**
     * Port to connect
     * @default 5672
     */
    port?: number;
    /**
     * User to connect
     * @default guest
     */
    user?: string;
    /**
     * Password to connect
     * @default guest
     */
    pass?: string;
    /**
     * Host to connect
     */
    vhost?: string;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    amqpConn: fastifyAmqp.FastifyAmqpConnObject;
    amqpChannel: fastifyAmqp.FastifyAmqpChannelObject;
  }
}

declare const fastifyAmqp: FastifyPlugin<fastifyAmqp.FastifyAmqpOptions>;

export default fastifyAmqp;
