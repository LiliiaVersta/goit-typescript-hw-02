import axios from "axios";

const ACCESS_KEY = "1Db1RtriniJkhRwxLzWzQaFC8sk3-WaKEQa-grG5dzk";
const instance = axios.create({
  baseURL: "https://api.unsplash.com",
  timeout: 1000,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
    "Accept-Version": "v1",
  },
  params: {
    per_page: 12,
    orientation: "landscape",
  },
});
//
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
const fetchGalleryPhotos = async (
  query: string,
  page: number
): Promise<FetchGalleryPhotosResponse> => {
  const response = await instance.get("/search/photos", {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

export default fetchGalleryPhotos;
