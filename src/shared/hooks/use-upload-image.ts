import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IImageFields, IUploadImage } from "../types/image";
import axios from "axios";
import { APIResponse } from "../types/api";

export default function useUploadImage() {
  //state
  const [uploadProgress, setUploadProgress] = useState(0);

  //mutation
  const mutation = useMutation({
    mutationFn: async ({ image }: IImageFields) => {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post<APIResponse<IUploadImage>>(
        "/api/image",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (!progressEvent?.total) return;

            setUploadProgress(
              Math.round((progressEvent?.loaded * 100) / progressEvent?.total),
            );
          },
        },
      );
      if (response.data.status === false)
        throw new Error(response.data.message);
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data.payload;
    },
    onSuccess: (data) => {
      console.log('upload success', data);
    },
    onError: (error) => {
      console.log('upload error', error);
    },
  });

  return {
    uploadProgress,
    ...mutation,
  };
}
