
import { useEffect, useState } from 'react'




interface CopyRoomIdButtonProps {
    id: string
}




function CopyRoomIdButton(props: CopyRoomIdButtonProps) {

    const { id } = props


    const [showHelperText, setShowHelperText] = useState<boolean>(false)

    let timeout: any = null



    const handleCopyRoomId = () => {

        navigator.clipboard.writeText(id)
        timeout && clearTimeout(timeout)

        timeout = setTimeout(() => setShowHelperText(false), 1500)

        setShowHelperText(true)
    }


    useEffect(() => {

        return () => {

            timeout && clearTimeout(timeout)
        }
    }, [])


    return (
        <div className="flex justify-center items-center flex-col">

            <div className="flex justify-center items-center">

                <span className="m-2 p-2">{id}</span>

                <button
                    title="Copy to clipboard"
                    onClick={handleCopyRoomId}
                    className="m-2 p-2 rounded-sm dark:bg-slate-800 dark:hover:bg-slate-400 bg-slate-400 hover:bg-slate-600"
                >💾</button>

            </div>

            {showHelperText ? (<div className="text-gray-500">Room id had been successfully copied!</div>) : null}
        </div>
    )
}



export default CopyRoomIdButton
