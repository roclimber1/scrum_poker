
import type { ReactNode } from 'react'


interface LayoutProps {
    children: ReactNode
}


export default function Layout({ children }: LayoutProps) {

    return (
        <section>
            <div>
                <ul className="flex-row flex p-2 m-2 gap-3">
                    <li>First</li>
                    <li>Second</li>
                </ul>
            </div>

            {children}
        </section>
    )
}
