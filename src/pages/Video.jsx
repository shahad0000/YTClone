import axios from "axios";
import millify from "millify";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { AiOutlineLike } from "react-icons/ai";
import { GrDislike } from "react-icons/gr";
import { RiShareForwardLine } from "react-icons/ri";
import { RiDownloadLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";

const API_KEY = "AIzaSyBM8EqTfxpbMKiudVnazUrOT7tgpl8Ri6A";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const Video = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState({
    snippet: {},
    statistics: {},
  });
  const [comments, setComments] = useState([]);
  const [channel, setChannel] = useState({
    snippet: { thumbnails: { high: {} } },
    statistics: {},
  });

  const getRecoms = async () => {
    try {
      const searchRes = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: "snippet",
          maxResults: 1,
          chart: "mostPopular",
          type: "video",
          key: API_KEY,
        },
      });
      const videosIds = searchRes.data.items
        .map((video) => video.id.videoId)
        .join(",");
      const videosRes = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics",
          id: videosIds,
          key: API_KEY,
        },
      });
      if (videosRes.data.items.length > 0) setVideos(videosRes.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch the playing video
  const getVideo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics",
          id: id,
          key: API_KEY,
        },
      });
      console.log(res.data.items[0]);

      if (!res.data.items.length) return;
      setPlayingVideo(res.data.items[0]);

      // Get channel who uploaded the video
      const channelRes = await axios.get(`${BASE_URL}/channels`, {
        params: {
          part: "snippet,statistics",
          id: res.data.items[0].snippet.channelId,
          key: API_KEY,
        },
      });
      console.log(channelRes.data.items);
      if (channelRes.data.items.length > 0) {
        setChannel(channelRes.data.items[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/commentThreads`, {
        params: {
          part: "snippet",
          maxResults: 5,
          videoId: id,
          key: API_KEY,
        },
      });
      console.log(res.data.items);
      setComments(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRecoms();
    getVideo();
    getComments();
  }, [id]);

  return (
    <div className="bg-primary flex text-white p-0 pt-10 overflow-scroll">
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center p-10 min-h-screen">
        <div className="col-span-3 w-full ">
          <iframe
            className=" w-full lg:h-[70vh] aspect-video rounded-xl"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div>
            <div className="w-full flex flex-col gap-3 mt-2">
              <div className="text-xl font-bold">
                {playingVideo.snippet.title}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="flex w-full justify-between lg:justify-start lg:gap-11 items-center px-2 ">
                  <div className="flex items-center gap-4">
                    <div className="w-10 rounded-full overflow-hidden">
                      <img
                        className="rounded-full"
                        src={channel.snippet.thumbnails?.high?.url}
                        alt="channel photo"
                      />
                    </div>
                    <div className="text-sm">
                      <div className="font-bold">
                        {playingVideo.snippet.channelTitle}
                      </div>
                      <div className="text-[#afabab] text-xs">
                        {millify(channel.statistics.subscriberCount)}{" "}
                        subscribers
                      </div>
                    </div>
                  </div>

                  <div>
                    <button className="bg-white text-black py-1 px-3 rounded-2xl">
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-secondary w-fit p-1 px-4 rounded-3xl flex items-center gap-1">
                    <span>
                      <AiOutlineLike />
                    </span>
                    {millify(playingVideo.statistics.likeCount)}
                  </div>
                  <div className="bg-secondary w-fit p-2 px-4 rounded-3xl flex items-center gap-1">
                    <GrDislike />
                  </div>
                  <div className="bg-secondary w-fit p-1 px-4 rounded-3xl flex items-center gap-1">
                    <RiShareForwardLine />
                    <span>Share</span>
                  </div>
                  <div className="bg-secondary w-fit p-1 px-4 rounded-3xl flex items-center gap-1">
                    <RiDownloadLine />

                    <span>Download</span>
                  </div>
                  <div className="bg-secondary w-fit p-1 px-4 rounded-3xl flex items-center gap-1">
                    <FaRegBookmark />
                    <span>Save</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-4 rounded-2xl">
                <div className="flex gap-2 text-[#afabab]">
                  <div className="flex">
                    <div className="mr-1">views • </div>
                    {millify(playingVideo.statistics.viewCount)}
                  </div>
                  <div>
                    {playingVideo.snippet.publishedAt &&
                      formatDistanceToNow(
                        new Date(playingVideo.snippet.publishedAt),
                        { addSuffix: true }
                      )}
                  </div>
                </div>
                <div className="overflow-hidden">
                  {playingVideo.snippet.description}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold">
              {" "}
              {millify(playingVideo.statistics.commentCount)} Comments
            </div>
            <div>
              <input
                type="text"
                placeholder="Add comment...."
                className="border-b-1 border-gray-300 w-full m-8"
              />
            </div>
            <div className="flex flex-col gap-5">
              {comments.map((com) => (
                <div key={com.id}>
                  <div className="flex gap-4">
                    <div><img className="rounded-full" src={com.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" /></div>
                    <div className="flex flex-col">
                    <div className="font-bold text-white w-fit rounded-3xl">           
                      {com.snippet.topLevelComment.snippet.authorDisplayName}
                    </div>
                    <div className="text-sm">{com.snippet.topLevelComment.snippet.textDisplay}</div>
                  </div>
                  </div>
              
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* side videos */}
        <div className="col-span-1 flex flex-col gap-2 p-2 rounded-md">
          <div className="p-2">
            <img
              className="object-cover rounded-2xl"
              src="/imgs/LinkedinAd.png"
              alt=""
            />
          </div>
          {videos.map((video) => (
            <div key={video.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-2 lg:gap-0">
                <div className="w-full aspect-video lg:w-39  rounded-md overflow-hidden ">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={video.snippet.thumbnails.high.url}
                    alt="video thumbnail"
                  />
                </div>
                <div className="flex flex-col gap-1 text-xs ">
                  <div className="font-bold">{video.snippet.title}</div>
                  <div>{video.snippet.channelTitle}</div>
                  <div className="flex gap-2 text-[#afabab]">
                    <div className="flex">
                      <div className="mr-1">views • </div>
                      {millify(video?.statistics?.viewCount)}
                    </div>
                    <div>
                      {formatDistanceToNow(
                        new Date(video.snippet.publishedAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
