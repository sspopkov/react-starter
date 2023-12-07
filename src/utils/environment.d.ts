declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: number;
      NODE_ENV: "development" | "production" | "test";
      BASE_PATH: string;
      BACKEND_URL: string;
    }
  }
}

export {};
