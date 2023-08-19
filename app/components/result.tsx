import { useChat } from "ai/react"
import Image from "next/image"
import { getTitle, getSummary } from "../utils/chatTextParser"

export const Result = () => {
    const { messages } = useChat({id: 'main'})

    const title = messages.length > 1 ? <p>{getTitle(messages[messages.length - 1].content)}</p> : <p></p>
    const summary = messages.length > 1 ? <p>{getSummary(messages[messages.length -1].content)}</p> : <p></p>
    
    return (
        <div className="flex flex-col items-center p-24">
            <div className="relative h-[72vh] w-[40.5vh] outline-double">
                <Image 
                    src = "/CandleCard.png"
                    alt = "Picture of candle"
                    layout = "fill"
                    className="-z-10"
                />
                <div className="absolute top-[5vh] px-[4vh] w-full text-center">{title}</div>
                <div className="relative pt-[15vh] px-[4vh] ">{summary}</div>
                <div className="absolute bottom-4 w-full text-right pr-10">名前です</div>
            </div>
        </div>
    )
}