import EditorJS from '@editorjs/editorjs'
import { memo, useEffect, useRef } from 'react'


const Editor = ({data, onChange, editorBlock}: {data: JSON, onChange: (data: JSON) => void, editorBlock: string}) => {
    const ref = useRef<EditorJS | undefined>()
    useEffect(()=> {
        if (!ref.current){
            const editor = new EditorJS({
                holder: editorBlock,
                data: data,
                async onChange(api, event) {
                    const data = await api.saver.save()
                    onChange(data)
                }
            })
            ref.current = editor
        }
        return () => {
            if(ref.current && ref.current.destroy){
                ref.current.destroy()
            }
        }
    }, [])
    return <div id={editorBlock}></div>

}

export default memo(Editor)