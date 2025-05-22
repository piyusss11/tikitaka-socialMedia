import mongoose, { models, Schema, model } from "mongoose";
export const VIDEO_DIMENSIONS = {
  height: 1920,
  width: 1080,
} as const;
export interface IVideo {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  dimensions: {
    height: number;
    width: number;
    quality: number;
  };
  controls?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: mongoose.Types.ObjectId;
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    dimensions: {
      height: {
        type: Number,
        required: true,
        default: VIDEO_DIMENSIONS.height,
      },
      width: { type: Number, required: true, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, required: true, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
