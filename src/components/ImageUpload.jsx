import { useState } from "react";
import Image from "next/image";

export default function ImageUpload({ returnImage,preLoadedImage }) {
  const [imageAsFile, setImageAsFile] = useState();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleImageAsFile = async (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
    if (image) {
      uploadToCloudinary(image);
    }
  };

  const uploadToCloudinary = async (image) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImgUrl(data.secure_url);
      returnImage(data.secure_url);
      console.log("Uploaded to Cloudinary successfully");
    } catch (error) {
      console.error("Cloudinary upload error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if(preLoadedImage){
    return <div>
      <label className="w-fit">
        <span className="bg-gray-500/10 border-2 p-3 rounded border-gray-200 border-dashed">
          Update Cover Image
        </span>
        <input onChange={handleImageAsFile} type="file" hidden />
      </label>
      <Image
              className="border border-gray-400 rounded-md"
              width={250}
              height={170}
              src={preLoadedImage}
              alt="upload img"
            />
    </div>
  }

  return (
    <div className="py-2 flex flex-col gap-5 w-full">
      <label className="w-fit">
        <span className="bg-gray-500/10 border-2 p-3 rounded border-gray-200 border-dashed">
          Upload Cover Image
        </span>
        <input onChange={handleImageAsFile} type="file" hidden />
      </label>
      <div>
        {loading && <button disabled>Uploading...</button>}

        {imgUrl && (
          <div>
            <h3>Uploaded Successfully!</h3>
            <img
              className="border border-gray-400 rounded-md"
              src={imgUrl}
              alt="upload img"
              style={{ width: "30%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
