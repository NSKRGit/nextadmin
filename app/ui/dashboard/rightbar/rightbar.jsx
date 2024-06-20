import Image from "next/image";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import styles from './rightbar.module.css';
const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src="/astronaut.png" alt="" fill className={styles.bg} />
                </div>
                <div className={styles.text}>
                    <span className={styles.notification}>
                        Available Now
                    </span>
                    <h3 className={styles.title}>How to use the new version of the admin dashboard?</h3>
                    <span className={styles.subtitle}>Take 4 minutes to learn</span>
                    <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <button className={styles.button}>
                        <MdPlayCircleFilled />
                        Watch
                    </button>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.text}>
                    <span className={styles.notification}>
                        Coming Soon
                    </span>
                    <h3 className={styles.title}>New server actions are available, partial pre-rendering is coming up!</h3>
                    <span className={styles.subtitle}>Boost your productivity</span>
                    <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <button className={styles.button}>
                        <MdReadMore />
                        Learn
                    </button>
                </div>
            </div>    
        </div>
    );
};

export default Rightbar