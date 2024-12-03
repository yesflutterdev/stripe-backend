import styles from "../../styles/Header.module.css"
import Link from "next/link"
export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.headerLink}></div>
      </Link>
      <div>
        <span className={styles.brandName}>Efandex</span>{" "}
      </div>
    </div>
  )
}
