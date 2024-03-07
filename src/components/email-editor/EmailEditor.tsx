import styles from './EmailEditor.module.css'

export function EmailEditor() {

  return (
    <>
      
      <h1>Email editor</h1>
      <div className={styles.card}>
        <div className={styles.editor}>

        </div>
        <div className={styles.actions}>
          <div className={styles.tools}>
            
          </div>
          <button>Send Now</button>
        </div>

      </div>
     
    </>
  )
}

