export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const NEXT_PUBLIC_WEB_URL = process.env.NEXT_PUBLIC_WEB_URL as string;
export const NEXT_PUBLIC_SUPABASE_URL = process.env
  .NEXT_PUBLIC_SUPABASE_URL as string;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const NEXT_PUBLIC_BUCKET_URL = process.env
  .NEXT_PUBLIC_BUCKET_URL as string;

export const SUPABASE_SERVICE_ROLE_KEY = process.env
  .SUPABASE_SERVICE_ROLE_KEY as string;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const GITHUB_ID = process.env.GITHUB_ID as string;
export const GITHUB_SECRET = process.env.GITHUB_SECRET as string;

export const STRIPE_PRICES = {
  standard: process.env.STRIPE_STANDARD_PRICE_ID as string,
  lifetime: process.env.STRIPE_LIFETIME_PRICE_ID as string,
};
