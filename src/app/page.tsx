import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className='text-3xl'>OSR Tools</h1>
        <p>Pages</p>
        <ul>
          <li>
            <Link className='underline' href='/knave/generate-character'>
              Generate Knave Character
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
