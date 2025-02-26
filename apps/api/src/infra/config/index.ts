require("dotenv").config();

export const NODE_ENV = process.env.NODE_ENV || "development";

export const SERVER_PORT = process.env.PORT || 4000;
export const DB_CONNECTION = process.env.DB_CONNECTION as string;
export const DB_TEST_CONNECTION = process.env.DB_TEST_CONNECTION as string;

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
export const STRIPE_WEBHOOK_SECRET = process.env
  .STRIPE_WEBHOOK_SECRET as string;

export const STRIPE_PRICES = {
  standard: process.env.STRIPE_STANDARD_PRICE_ID as string,
  lifetime: process.env.STRIPE_LIFETIME_PRICE_ID as string,
};

export const WEB_URL = process.env.WEB_URL as string;

export const AWS_DATA = {
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID as string,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY as string,
  aws_region: process.env.AWS_REGION as string,
  aws_bucket_name: process.env.AWS_BUCKET_NAME as string,
};
