import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/appwriteConfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor =
    postData && userData ? postData.userId === userData.$id : false;

  useEffect(() => {
    console.log("234234234332", slug);
    if (slug) {
      appwriteService.getSinglePost(slug).then((post) => {
        if (post) setPostData(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(postData.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(postData.featuredImage);
        navigate("/");
      }
    });
  };
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imgSrc = await appwriteService.getFilePreview(
          postData.featuredImage
        );
        setImageSrc(imgSrc);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [postData]);

  console.log(postData);

  return postData && imageSrc ? (
    <div className="py-8">
      <Container>
        <div className="w-full justify-center my-10">
          <h1 className="text-5xl font-bold">{postData.title.toUpperCase()}</h1>
        </div>
        <div className="w-full justify-items-center  border-2 border-red-100 p-8 ">
          <img src={imageSrc} alt={postData.title} />
        </div>
        <div className="browser-css">{parse(postData.content)}</div>
        {isAuthor && (
          <div className="right-6 top-6">
            <Link to={`/edit-post/${postData.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </Container>
    </div>
  ) : (
    <>loading...</>
  );
}
