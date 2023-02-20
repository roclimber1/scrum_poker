
import Link from 'next/link'
import CreateNote from './CreateNote'




interface NotesItem {
    id: string,
    title: string,
    content: string,
    created: string
}


interface ServerData {
    items: Array<NotesItem>
}


async function getNotes(): Promise<Array<NotesItem>> {

    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30',
        { cache: 'no-store' }
    )

    const data: ServerData = await res.json()


    return data?.items
}


export default async function NotesPage() {

    const notes: Array<NotesItem> = await getNotes()

    return (
        <div>
            <h1>Notes Page</h1>
            <div className="flex m-4 p-2 w-8 from-lime-600">
                {notes?.map((note) => {

                    return <Note key={note.id} note={note} />
                })}
            </div>

            <CreateNote />
        </div>
    )
}

interface NoteProps {
    note: NotesItem
}


function Note({ note }: NoteProps) {

    const { id, title, content, created } = note || {}


    return (
        <Link href={`/notes/${id}`}>
            <div>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    )
}
