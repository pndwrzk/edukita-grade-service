import { config } from "dotenv";
config({ path: ".env" });

export const {
  PORT,
  NODE_ENV,
  BASE_URL,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
} = process.env;

export const {
DB_NAME_SQLITE,
  DB_PORT_POSTGRES,
  DB_USERNAME_POSTGRES,
  DB_PASSWORD_POSTGRES,
  DB_NAME_POSTGRES,
  DB_HOST_POSTGRES,
  DB_DIALECT,
} = process.env;
