// import csurf from 'csurf';
// app.use(csurf({ cookie: true }));

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from "url";

import logger from './core/config/logger.js';
import errorHandler from './core/middlewares/errorMiddleware.js';
import notFound from './core/middlewares/notFound.js';
import { globalLimiter } from './lib/limit.js';
import appRouter from './core/app/appRouter.js';
import { globalErrorHandler } from './core/middlewares/globalErrorHandler.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = [
  "https://fleetcoreremarketing.com",
  "https://admin.fleetcoreremarketing.com",
  "https://api.fleetcoreremarketing.com",
  "http://localhost:3000", // optional (dev)
];

const corsOptions = {
  origin: (origin, cb) => {
    // allow tools like Postman/curl (no Origin header)
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) return cb(null, true);

    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ use SAME options

// handle preflight
app.options("*", cors());
app.use(xssClean());
app.use(mongoSanitize());


// Set up logging middleware
app.use(morgan('combined'));

// Set up body parsing middleware
app.use(express.json({ limit: '10000kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up rate limiting middleware
app.use(globalLimiter);

// Set up static files middleware
const uploadPath = path.resolve(__dirname, "../uploads");
app.use("/uploads", express.static(uploadPath));

// Set up API routes
app.use('/api', appRouter);

// Set up 404 error middleware
app.use(notFound);

// Set up error handling middleware
app.use(globalErrorHandler);

logger.info('Middleware stack initialized');

export  { app }; 


