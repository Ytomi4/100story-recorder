import { useChat } from "ai/react"
import Image from "next/image"
import { getTitle, getSummary } from "../utils/chatTextParser"
import { FaDownload } from 'react-icons/fa'

export const Result = () => {
    const { messages } = useChat({id: 'main'})

    const title = messages.length > 1 ? <p>{getTitle(messages[messages.length - 1].content)}</p> : <p></p>
    const summary = messages.length > 1 ? <p>{getSummary(messages[messages.length -1].content)}</p> : <p></p>

    console.log(messages)

    const getCurrentTimestamp = () => {
        const now = new Date();
        const YYYY = now.getFullYear();
        const MM = String(now.getMonth() + 1).padStart(2, '0');
        const DD = String(now.getDate()).padStart(2, '0');
        const HH = String(now.getHours()).padStart(2, '0');
        const MIN = String(now.getMinutes()).padStart(2, '0');
        const SS = String(now.getSeconds()).padStart(2, '0');
        return `${YYYY}${MM}${DD}_${HH}${MIN}${SS}`;
      };

    const downloadFile = (filename: string, text: string) => {
        const blob = new Blob([text], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename + '_' + getCurrentTimestamp() + '.txt'
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleDownload = () => {
        downloadFile('RecordedText', messages[0].content)
        setTimeout(() => {downloadFile('Summary', messages[1].content)}, 1)
    }
    
    return (
        <div className="flex flex-col items-center p-24">
            <div className="relative h-[72vh] w-[40.5vh] outline-double">
                <Image 
                    src = "/CandleCard.png"
                    alt = "Picture of candle"
                    layout = "fill"
                    className="-z-10 opacity-30"
                />
                <div className="relative pt-8 px-[4vh] w-full text-center">{title}</div>
                <div className="relative pt-5 px-[4vh] text-sm ">{summary}</div>
            </div>
            <div className="relative flex mt-4">
                <button className="px-3" onClick={handleDownload}>
                    <FaDownload/>
                </button>
            </div>

        </div>
    )
}