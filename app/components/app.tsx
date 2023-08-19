import { Recorder } from "./recorder"

export const App = () => {
    return (
        <div  className="relative min-h-screen">
            <Recorder/>
            <div className="fixed bottom-0 w-screen h-[60vh] overflow-hidden -z-10">
                <video autoPlay loop muted className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[60vh] w-auto object-cover">
                    <source src="/candle.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}