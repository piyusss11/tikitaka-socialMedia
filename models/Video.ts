import mongoose, { models, Schema, model } from "mongoose";
export const VIDEO_DIMENSIONS = {
  height: 1920,
  weight: 1080,
};
interface IVideo {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
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
  },
  { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
