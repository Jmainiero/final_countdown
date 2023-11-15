import { useRef, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
const ResultModal = forwardRef(function ResultModal({ result, targetTime, remainingTime, onReset }, ref) {

    const dialog = useRef() //Create a new ref and use it as a ref prop to <dialog></dialog>

    const userLost = remainingTime <= 0
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2) //Convert Seconds to MS
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100) //Get a score between 0 and 100

    //Used to define properties that should be accessible outside the component -- First property is always ref, second value is a function that returns and object.
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal() //When open is called, the showModal method on <dialog></dialog> is called
            }
        }
    })

    return createPortal(
        <dialog className="result-modal" ref={dialog} onClose={onReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your Score: {score}.</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ResultModal