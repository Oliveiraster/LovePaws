import styles from './styles.module.css'

function RoundedImage({src, alt, key, width}){
    return(
        <img className={`${styles.rounded_image} ${styles[width]}`} 
        src={src} 
        alt={alt} 
        key={key}/>
    )
}

export default RoundedImage