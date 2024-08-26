import EditorJS from "@editorjs/editorjs"

export function CreateBlog() {
    const [data, setData] = useState(INIT_DATA)
    return (
        <div>
            <EditorJS data={data} onChange={setData} editorBlock='editorjs-container'/>
        </div>
    )
}