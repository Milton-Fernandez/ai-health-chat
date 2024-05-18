import './robot.scss';

function Robot() {
    
    return (
        <>
            <div className="cute-robot-v1">
                <div className="circle-bg">
                    <div className="robot-ear left"></div>
                    <div className="robot-head">
                        <div className="robot-face">
                            <div className="eyes left"></div>
                            <div className="eyes right"></div>
                            <div className="mouth"></div>
                        </div>
                    </div>
                    <div className="robot-ear right"></div>
                    <div className="robot-body"></div>
                </div>

                <div className="robot-speech-bubble">
                    <p>Hey! My name is Heath, the health AI robot. Ask me a question and I'll do
                    my best to respond!
                    </p>
                </div>
            </div>
         
        </>
        
    )
}

export default Robot