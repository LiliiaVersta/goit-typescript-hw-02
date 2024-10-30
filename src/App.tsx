import { useState, useEffect, useRef } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";

import { Toaster } from "react-hot-toast";

import fetchGalleryPhotos from "./unsplash-api";

interface PhotoUrls {
  regular: string;
  small: string;
}
interface Photo {
  id: string;
  alt_description: string;
  urls: PhotoUrls;
}
interface FetchGalleryPhotosResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}
export const App = () => {
  const [page, setPage] = useState<number>(1);
  const [queryValue, setQueryValue] = useState<string>("");
  const [gallery, setGallery] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [altDescription, setAltDescription] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function updateModalStateData(src: string, alt: string) {
    setModalImage(src);
    setAltDescription(alt);
  }

  useEffect(() => {
    if (queryValue === "") return;

    const handleSearch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data: FetchGalleryPhotosResponse = await fetchGalleryPhotos(
          queryValue,
          page
        );
        console.log("data: ", data);
        if (data.total === 0) return;
        setGallery((prevGallery) => {
          return [...prevGallery, ...data.results];
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);

        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  }, [page, queryValue]);

  useEffect(() => {
    if (page === 1) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [page, gallery]);
  const handleQuery = (newQuery: string) => {
    setQueryValue(newQuery);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const isActive = page === totalPages;

  return (
    <div ref={ref}>
      <SearchBar onSubmit={handleQuery} />
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          openModal={openModal}
          updateModalStateData={updateModalStateData}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {gallery.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isActive={isActive} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage}
        alt={altDescription}
      />
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
};
