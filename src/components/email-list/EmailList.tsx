import { useQuery } from '@tanstack/react-query'
import styles from './EmailList.module.scss'
import { emailService } from '../../services/email.services'
import HTMLReactParser from 'html-react-parser/lib/index'

export function EmailList() {
    const { data } = useQuery({
        queryKey: ['email list'],
        queryFn: () => emailService.getEmails()
    })

    return (<div className={styles.list}>
        {data?.map(email => (
            <div key={email.text}>{ HTMLReactParser(email?.text)}</div>
        ))}
    </div>)
}