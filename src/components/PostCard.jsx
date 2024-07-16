import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/appwriteConfig";

function PostCard({ $id, title, featuredImage }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imgSrc = await appwriteService.getFilePreview(featuredImage);
        setImageSrc(imgSrc);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="rounded-xl" />
          ) : (
            <p>loading...</p>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
