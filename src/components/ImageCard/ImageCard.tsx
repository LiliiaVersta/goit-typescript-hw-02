import styles from "./ImageCard.module.css";
interface PhotoUrls {
  regular: string;
  small: string;
}

type Props = {
  alt_description: string;
  urls: PhotoUrls;
  updateModalStateData: (url: string, alt: string) => void;
};

const ImageCard: React.FC<Props> = ({
  alt_description,
  urls,
  updateModalStateData,
}) => {
  return (
    <div
      className={styles.cardWrapper}
      onClick={() => updateModalStateData(urls.regular, alt_description)}
    >
      <img
        className={styles.cardImage}
        src={urls.small}
        alt={alt_description}
      />
      <p className={styles.cardDescription}>{alt_description}</p>
    </div>
  );
};
export default ImageCard;
