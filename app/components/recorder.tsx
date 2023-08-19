import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

export const Recorder = () => {
    const router = useRouter()
    const [inputText, setInputText] = useState("")
    const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition>()
    const [isMicRecording, setIsMicRecording] = useState(false);

    /*
    同じChatを他コンポーネントからも参照するため、idを指定
    https://sdk.vercel.ai/docs/api-reference/use-chat
    */
    const { messages, input, setInput, handleSubmit, handleInputChange } = useChat({id: 'main'})

    /*
    音声認識結果の操作
    SpeechRecognitionのresultイベント
    */
    const handleRecognitionResult = useCallback(
        (event :SpeechRecognitionEvent) => {
            const resultList = event.results
            const texts = []
            for (let i = 0; i < resultList.length; i++){
                texts.push(resultList[i][0].transcript)
            }

            const text = texts.join(" ")
            setInputText(text)

            setInput(text)
        },
        [setInput]
    )
    
    /*
    マイクボタンの操作
    録音の開始・終了はボタン操作でのみ可能にする
    */
    const handleClickMicButton = useCallback( () => {
        if (isMicRecording) {
            speechRecognition?.abort()
            setIsMicRecording(false)
            return
        }

        speechRecognition?.start()
        setIsMicRecording(true)
    }, [isMicRecording, speechRecognition])

    /*
    Chatへのテキスト送信時の処理
    */
    const handleSubmitAndGoResult = (e: FormEvent<HTMLFormElement>) => {
        handleSubmit(e)

        router.push("/result")
    }

    useEffect(() => {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition

        if (!SpeechRecognition) {
            return
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "ja-JP"
        recognition.interimResults = true
        recognition.continuous = true

        recognition.addEventListener("result", handleRecognitionResult)

        recognition.addEventListener("speechstart", (ev: Event) => {console.log(ev)})
        recognition.addEventListener("speechend", (ev: Event) => {console.log(ev)})

        setSpeechRecognition(recognition)
    }, [handleRecognitionResult])

    return (
        <div  className="flex flex-col items-center p-12">
            <div className="flex">
                <button onClick = {handleClickMicButton} className="bg-red-600 hover:bg-red-700 rounded-full p-5 transition duration-300 m-2">
                    {isMicRecording? "Stop" : "Record"}
                </button>
                {isMicRecording? 
                    <div></div>
                    :
                    <form onSubmit={handleSubmitAndGoResult}>
                        <button className="bg-green-600 hover:bg-green-700 rounded-full p-5 transition duration-300 m-2" type="submit">submit</button>
                    </form>
                }

            </div>
            <div className="px-1 py-4 md:w-[30rem] lg:w-[40rem]">
                {inputText}
            </div>
        </div>
    )
}