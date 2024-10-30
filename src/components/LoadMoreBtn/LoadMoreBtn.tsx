type Props = {
  handleLoadMore: () => void;
  isActive: boolean;
};
const LoadMoreBtn: React.FC<Props> = ({ handleLoadMore, isActive }) => {
  return (
    <button onClick={handleLoadMore} type="button" disabled={isActive}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
