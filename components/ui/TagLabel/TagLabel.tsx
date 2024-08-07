import styles from './styles.module.css'

const TagLabel = (props:any) => {
  return (
    <div className={styles['tagLabel']} style={props.styles}>
     {props.label}
    </div>
  )
}

export default TagLabel