"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    PORT: (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 3000,
    DB_HOST: (_b = process.env.DB_HOST) !== null && _b !== void 0 ? _b : 'localhost',
    DB_PORT: (_c = Number(process.env.DB_PORT)) !== null && _c !== void 0 ? _c : 3000,
    DB_USERNAME: (_d = process.env.DB_USERNAME) !== null && _d !== void 0 ? _d : '',
    DB_PASSWORD: (_e = process.env.DB_PASSWORD) !== null && _e !== void 0 ? _e : '',
    DB_NAME: (_f = process.env.DB_NAME) !== null && _f !== void 0 ? _f : '',
    MOODLE_URL: (_g = process.env.MOODLE_URL) !== null && _g !== void 0 ? _g : '',
    MOODLE_TOKEN: (_h = process.env.MOODLE_TOKEN) !== null && _h !== void 0 ? _h : '',
    EMAIL_HOST: (_j = String(process.env.EMAIL_HOST)) !== null && _j !== void 0 ? _j : "sandbox.smtp.mailtrap.io",
    EMAIL_PORT: (_k = process.env.EMAIL_PORT) !== null && _k !== void 0 ? _k : 25,
    EMAIL_USER: (_l = process.env.EMAIL_USER) !== null && _l !== void 0 ? _l : "222b0d892997f1",
    EMAIL_PASS: (_m = process.env.EMAIL_PASS) !== null && _m !== void 0 ? _m : "44f6c1b56636b7",
    FROM_EMAIL: (_o = process.env.FROM_EMAIL) !== null && _o !== void 0 ? _o : "test@funiber.org",
    ACADEMIC_RECORD_API_URL: (_p = process.env.ACADEMIC_RECORD_API_URL) !== null && _p !== void 0 ? _p : '',
    EDUCATIONAL_SYNC_URL: (_q = process.env.EDUCATIONAL_SYNC_URL) !== null && _q !== void 0 ? _q : '',
    TRANSACTION_DELAY_MINUTES: process.env.TRANSACTION_DELAY_MINUTES ? Number(process.env.TRANSACTION_DELAY_MINUTES) : 5,
    RABBIT_USERNAME: (_r = process.env.RABBIT_USERNAME) !== null && _r !== void 0 ? _r : '',
    RABBIT_PASSWORD: (_s = process.env.RABBIT_PASSWORD) !== null && _s !== void 0 ? _s : '',
    RABBIT_PROTOCOL: (_t = process.env.RABBIT_PROTOCOL) !== null && _t !== void 0 ? _t : '',
    RABBIT_HOSTNAME: (_u = process.env.RABBIT_HOSTNAME) !== null && _u !== void 0 ? _u : '',
    RABBIT_PORT: (_v = process.env.RABBIT_PORT) !== null && _v !== void 0 ? _v : 5672,
    RABBIT_VHOST: (_w = process.env.RABBIT_VHOST) !== null && _w !== void 0 ? _w : '/',
    RABBIT_QUEUE: (_x = process.env.RABBIT_QUEUE) !== null && _x !== void 0 ? _x : 'domain-name.subdomain-name',
    RABBIT_ROUTING_KEY: (_y = process.env.RABBIT_ROUTING_KEY) !== null && _y !== void 0 ? _y : 'sagittarius-a',
    RABBIT_EXCHANGE: (_z = process.env.RABBIT_EXCHANGE) !== null && _z !== void 0 ? _z : 'sagittarius-a',
    RABBIT_DIRECT_EXCHANGE: (_0 = process.env.RABBIT_DIRECT_EXCHANGE) !== null && _0 !== void 0 ? _0 : 'sagittarius-a-direct',
    RABBIT_TYPE_EXCHANGE: (_1 = process.env.RABBIT_TYPE_EXCHANGE) !== null && _1 !== void 0 ? _1 : 'fanout',
    RABBIT_TYPE_DIRECT_EXCHANGE: (_2 = process.env.RABBIT_TYPE_DIRECT_EXCHANGE) !== null && _2 !== void 0 ? _2 : 'direct',
    RABBIT_PREFETCH: (_3 = Number(process.env.RABBIT_PREFETCH)) !== null && _3 !== void 0 ? _3 : 1,
    //rabbit retry
    RABBIT_RETRY_QUEUE: (_4 = process.env.RABBIT_RETRY_QUEUE) !== null && _4 !== void 0 ? _4 : 'domain-name.subdomain-name.events-retry',
    RABBIT_RETRY_ROUTING_KEY: (_5 = process.env.RABBIT_RETRY_ROUTING_KEY) !== null && _5 !== void 0 ? _5 : 'domain-name.subdomain-name.events-retry',
    RABBIT_RETRY_ENDPOINT: (_6 = process.env.RABBIT_RETRY_ENDPOINT) !== null && _6 !== void 0 ? _6 : 'teaching-action.service',
    RABBIT_MESSAGE_TTL: (_7 = Number(process.env.RABBIT_MESSAGE_TTL)) !== null && _7 !== void 0 ? _7 : 10000,
    //rabbit dead letter
    RABBIT_DEAD_LETTER_QUEUE: (_8 = process.env.RABBIT_DEAD_LETTER_QUEUE) !== null && _8 !== void 0 ? _8 : 'domain-name.dead-letter',
    RABBIT_DEAD_LETTER_ROUTING_KEY: (_9 = process.env.RABBIT_DEAD_LETTER_ROUTING_KEY) !== null && _9 !== void 0 ? _9 : 'domain-name.dead-letter',
    //rabbit resilience
    IMMEDIATE_RETRY_ATTEMPTS: (_10 = process.env.IMMEDIATE_RETRY_ATTEMPTS) !== null && _10 !== void 0 ? _10 : 5,
    DELAYED_RETRY_ATTEMPTS: (_11 = process.env.DELAYED_RETRY_ATTEMPTS) !== null && _11 !== void 0 ? _11 : 3,
    DELAY_IN_MS: (_12 = process.env.DELAY_IN_MS) !== null && _12 !== void 0 ? _12 : 1000,
};
