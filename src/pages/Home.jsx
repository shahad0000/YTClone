import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import millify from "millify";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { Link } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOndemandVideo } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { CgPlayList } from "react-icons/cg";
import { FaRegClock } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoIosCellular } from "react-icons/io";
import { SiYoutubegaming } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";

const API_KEY = "AIzaSyBM8EqTfxpbMKiudVnazUrOT7tgpl8Ri6A";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const Home = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics",
          maxResults: 1,
          chart: "mostPopular",
          type: "video",
          key: API_KEY,
        },
      });
      console.log(res.data.items);
      setVideos(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="bg-primary min-h-screen text-white pt-16 max-w-screen overflow-hidden scrollbar-hide">
      <div className="w-full justify-center grid grid-cols-1 lg:grid-cols-7">
        <div className="w-full  min-h-screen hidden lg:flex flex-col gap-1 text-sm text-[#e5e5e5]">
          <div className="bg-secondary p-2 px-7 gap-3 items-center flex rounded-2xl">
            <IoMdHome />
            <span>Home</span>
          </div>
          <div className="hover:bg-[#333333] p-2 px-7 gap-3 items-center flex rounded-2xl">
            <SiYoutubeshorts />
            <span>Shorts</span>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <MdOndemandVideo />
            <span>Subscibtions</span>
          </div>
          <hr className="border-[#333333] m-2" />
          <div className="p-2 px-7 gap-1 items-end flex rounded-2xl">
            <span className="font-bold">You</span>
            <div className="text-xl">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <FaHistory />
            <span>History</span>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <div className="text-2xl">
              <CgPlayList />
            </div>

            <span>Playlists</span>
          </div>
          <div className="py-2 pl-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <FaRegClock />
            <span>Watched Videos</span>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <GrLike />
            <span>Liked Videos</span>
          </div>
          <hr className="border-[#333333] m-2" />
          <div className="p-2 px-7 gap-1 items-end flex rounded-2xl">
            <span className="font-bold">Explore</span>
            <div className="text-xl">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <HiFire />
            <span>Trending</span>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <div>
              <IoMusicalNotesOutline />
            </div>
            <span>Musice</span>
          </div>
          <div className="py-2 pl-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <IoIosCellular />
            <span>Live</span>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <SiYoutubegaming />
            <span>Gaming</span>
          </div>
          <hr className="border-[#333333] m-2" />
          <div className="p-2 px-7 gap-1 items-end flex rounded-2xl">
            <div className="font-bold">More from YouTube</div>
          </div>

          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <FaYoutube className="text-red-500 text-2xl" />
            <span className="text-sm">YouTube Premuim</span>
          </div>
          <div className="py-2 pl-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <SiYoutubemusic className="text-red-500 text-2xl" />
            <span className="text-sm">YouTube Music</span>
          </div>
          <div className="p-2 px-7 hover:bg-[#333333] gap-3 items-center flex rounded-2xl">
            <SiYoutubekids className="text-red-500 text-2xl" />
            <span className="text-sm">YouTube Kids</span>
          </div>
        </div>
        {/* videos grid */}
        <div className="p-3 w-full lg:col-span-6">
          <div className="flex font-bold gap-2 overflow-x-auto whitespace-nowrap  scrollbar-hide w-full">
            <button className="bg-white text-black px-2 p-0.5 w-fit rounded-md cursor-pointer">
              All
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer ">
              Music
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              1940s
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Playlists
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Podcasts
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Live
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Architecture
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Resorts
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Gaming
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Camping
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Handpan
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Resturants
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Arab Music
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Thoughts
            </button>
            <button className="gray-btn p-0.5 px-3 h-fit w-fit rounded-md cursor-pointer">
              Work
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 p-2">
            {videos.map((video) =>
              video.snippet && video.statistics ? (
                <div key={video.id}>
                  <Link to={`/video/${video.id}`}>
                    <div className="w-full">
                      <img
                        className="w-full h-56 object-cover"
                        src={video.snippet.thumbnails.high.url}
                        alt="video thumbnail"
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-xs p-3">
                      <div className="flex items-baseline">
                        <div className="font-bold text-sm">
                          {video.snippet.title}
                        </div>
                        <div>
                          <BsThreeDotsVertical />
                        </div>
                      </div>

                      <div className="text-[#afabab]">
                        {video.snippet.channelTitle}
                      </div>
                      <div>
                        <div className="flex gap-2 text-[#afabab]">
                          <div className="flex">
                            <div className="mr-1">views • </div>
                            {millify(video.statistics.viewCount)}
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
                  </Link>
                </div>
              ) : (
                <div>Loading...</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
