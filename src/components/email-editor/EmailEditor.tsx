import { Bold, Eraser, Italic, Underline } from 'lucide-react'
import { useState, useRef } from 'react'
import styles from './EmailEditor.module.scss'
import { TStyle, applyStyle } from './apply-style'
import HTMLReactParser from 'html-react-parser/lib/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { emailService } from '../../services/email.services'

export function EmailEditor() {

  const [text, setText] = useState('')
  const [selectionStart, setSlectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const textRef = useRef<HTMLTextAreaElement | null>(null)

  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationKey:['create email'],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess(){
      setText('')
      queryClient.refetchQueries({queryKey:['email list']})
    }
  })



  const updateSelection = () => {
    if (!textRef.current) return
    setSlectionStart(textRef.current.selectionStart)
    setSelectionEnd(textRef.current.selectionEnd)
  }



  const applyFormat = (type: TStyle) => {
    const selectedText = text.substring(selectionStart, selectionEnd)

    const before = text.substring(0, selectionStart)
    const after = text.substring(selectionEnd)

    setText(before + applyStyle(type, selectedText) + after)
  }

  return (
    <div>

      <h1>Email editor</h1>
      <div className={styles.preview}>
          {HTMLReactParser(text)}
        </div>
      <div className={styles.card}>
       
        <textarea
          ref={textRef}
          className={styles.editor}
          spellCheck='false'
          onClick={updateSelection}
          value={text}
          onChange={e => setText(e.target.value)}>

        </textarea>
        <div className={styles.actions}>
          <div className={styles.tools}>
            <button onClick={() => setText('')}><Eraser size={17} /></button>
            <button onClick={() => applyFormat('bold')}><Bold size={17} /></button>
            <button onClick={() => applyFormat('italic')}><Italic size={17} /></button>
            <button onClick={() => applyFormat('underline')}><Underline size={17} /></button>



          </div>
          <button disabled={isPending} onClick={()=>mutate()}>Send Now</button>
        </div>

      </div>

    </div>
  )
}

