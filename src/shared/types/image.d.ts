import z from "zod";
import { imageSchema } from "../schemes/image.schema";

export type IImageFields = z.infer<typeof imageSchema>;

export interface IUploadImage {
    url: string
}