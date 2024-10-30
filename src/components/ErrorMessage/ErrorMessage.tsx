import styles from './ErrorMessage.module.css';

export default function ErrorMessage () {
	return (
		<div className={styles.errorContainer}>
			<p className={styles.errorText}>
				Something went wrong, please reload you page!
			</p>
		</div>
	);
};