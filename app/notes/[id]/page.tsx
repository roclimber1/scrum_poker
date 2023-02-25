
async function getNote(noteId: string) {

    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate: 10 }
        }
    )

    const data = await res.json()


    return data
}



export default async function NotePage({ params }: any) {

    const note = await getNote(params?.id)

    const { id, title, content, created } = note || {}


    return (
        <div>
            <h1>notes/{id}</h1>
            <div>
                <h3>{title}</h3>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </div>
    )
}
