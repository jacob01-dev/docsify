import { OpenAIEmbeddings } from "@langchain/openai";

const openAIEmbeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
  model: "text-embedding-3-small",
});

export default openAIEmbeddings;
