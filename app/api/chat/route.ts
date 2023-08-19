import { NextRequest } from 'next/server'
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai'
 
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { BytesOutputParser } from 'langchain/schema/output_parser'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
 
export const runtime = 'edge'
 
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  title: "title of the user's input text. max 20 tokens",
  summary: "summary of the user's input text. max 500"
})

const formatInstructions = parser.getFormatInstructions()
 
const TEMPLATE = "answer the title and summary of user's input text as best as possible in Japanese. user is trying to create a scary sentence. \n{format_instructions}\n{inputText}"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = body.messages ?? []
  const currentMessageContent = messages[messages.length - 1].content
 
  const prompt = new PromptTemplate({
    template: TEMPLATE,
    inputVariables: ["inputText"],
    partialVariables: { format_instructions: formatInstructions}
  })


  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatOpenAI({
    temperature: 0.8
  })
 
  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser()
 
  /*
   * Can also initialize as:
   *
   * import { RunnableSequence } from "langchain/schema/runnable";
   * const chain = RunnableSequence.from([prompt, model, outputParser]);
   */
  const chain = prompt.pipe(model).pipe(outputParser)
 
  const stream = await chain.stream({
    inputText: currentMessageContent
  })
 
  return new StreamingTextResponse(stream)
}