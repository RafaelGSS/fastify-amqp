import { Connection, Channel } from 'amqplib/callback_api';
import { FastifyPluginAsync } from 'fastify';

declare namespace fastifyAmqp {
  type FastifyAmqpConnObject = Connection

  type FastifyAmqpChannelObject = Channel

  interface FastifyAmqpOptions {
    /**
     * Full connection URL
     */
    url?: string
    /**
     * Host of connection
     */
    hostname?: string;
    /**
     * Port to connect
     * @default 5672
     */
    port?: number;
    /**
     * User to connect
     * @default 'guest'
     */
    username?: string;
    /**
     * Password to connect
     * @default 'guest'
     */
    password?: string;
    /**
     * The desired locale for error messages
     * @default 'en_US'
     */
    locale?: string;
    /**
     * @default 4kb
     */
    frameMax?: number;
    /**
     * The period of the connection heartbeat
     * @default 0
     */
    heartbeat?: number;
    /**
     * @default '/'
     */
    vhost?: string;
    /**
     * Socket options
     */
    socket?: any
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    amqpConn: fastifyAmqp.FastifyAmqpConnObject;
    amqpChannel: fastifyAmqp.FastifyAmqpChannelObject;
  }
}

declare const fastifyAmqp: FastifyPluginAsync<fastifyAmqp.FastifyAmqpOptions>;

export default fastifyAmqp;
