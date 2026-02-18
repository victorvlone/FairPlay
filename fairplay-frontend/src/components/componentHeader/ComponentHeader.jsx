import styles from "./ComponentHeader.module.css"

function ComponentHeader({titulo, descricao, className}){
    return(
        <div className={`${styles.componentHeader_container} ${className}`}>
            <h2>{titulo}</h2>
            <p>{descricao}</p>
        </div>
    )

}
export default ComponentHeader;