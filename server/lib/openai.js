// server/lib/openai.js
import OpenAI from "openai";

// the OpenAI SDK will pick up process.env.OPENAI_API_KEY by default,
// but you can also pass it explicitly here:
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
