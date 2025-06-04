import React, { useEffect, useState } from "react";
import millify from "millify";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { Link, useSearchParams } from "react-router";

const API_KEY = "AIzaSyBM8EqTfxpbMKiudVnazUrOT7tgpl8Ri6A";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const fetchSearch = async () => {
    try {
      const searchRes = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: "snippet",
          maxResults: 1,
          q: q,
          type: "video",
          key: API_KEY,
        },
      });
      console.log(searchRes.data.items);
      const videosIds = searchRes.data.items
        .map((video) => video.id.videoId)
        .join(",");
      // Get videos details
      const VideoRes = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics",
          id: videosIds,
          key: API_KEY,
        },
      });
      setVideos(VideoRes.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!q) return;
    fetchSearch();
  }, [q]);

  return (
    <div className="bg-primary min-h-screen text-white pt-30">
      <div className="flex w-full">
        <div className="w-[13%] min-h-screen "></div>
        {/* videos grid */}
        <div className="grid grid-cols-3 w-[85%] gap-4 p-2">
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
                  <div className="flex flex-col gap-1 text-xs p-1">
                    <div className="font-bold text-sm">
                      {video.snippet.title}
                    </div>
                    <div>{video.snippet.channelTitle}</div>
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
  );
};

export default Search;
