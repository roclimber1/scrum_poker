
import { forwardRef } from 'react'


import type { MouseEventHandler, Ref } from 'react'



interface DataInputBlockProps {
    buttonTitle: string,
    handleButtonClick: MouseEventHandler<HTMLButtonElement>,
    header: string,
    title: string
}




function DataInputBlock(props: DataInputBlockProps, ref: Ref<HTMLInputElement>) {

    const { buttonTitle, header, title, handleButtonClick } = props


    return (<>

        <h1>{header}</h1>

        <div className="text-gray-500 pt-3">{title}</div>


        <div className="flex flex-row gap-3">

            <input
                className="bg-sky-900 hover:bg-sky-700 rounded-md text-base p-3 my-3"
                type="text"
                ref={ref}
            />

            <button
                className="bg-orange-600 hover:bg-orange-400 rounded-md text-base p-3 my-3"
                onClick={handleButtonClick}
            >
                {buttonTitle}
            </button>
        </div>
    </>)
}



export default forwardRef<HTMLInputElement, DataInputBlockProps>(DataInputBlock)
