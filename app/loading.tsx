
import Loader from '@/components/Loader'

import { Montserrat } from 'next/font/google'




const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin']
})


export default function Loading() {

    return (
        <div className={`${montserrat.className} flex justify-center`}>
            <Loader />
        </div>
    )
}
