import Carousel from "~/Components/Carousel"
import styles from "../../modules/Portal.module.css"
import { useEffect, useState } from "react"
import { Loader } from "~/Components/Loader"


const Portal = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if(loading) return <Loader />

  return (
    <>
    <div className={styles.ctportal}>
        <Carousel />
    </div>
    </>
  )
}

export default Portal;