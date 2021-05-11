import styles from '../styles/LoadingIndicator.module.css'

export default function LoadingIndicator() {
  return (
    <div className={`fixed w-full ${styles.container}`}>
      <div className={`w-1 bg-gray-200 rounded h-1 ${styles.shim}`}></div>
    </div>
  )
}
