import React, { useState, useEffect } from "react";
import "./drishyam_home.css";

const DrishyamHome = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  // Fetch available videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/files/list");
        if (!response.ok) {
          throw new Error("Failed to fetch videos.");
        }
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Error fetching videos. Please try again.");
      }
    };

    fetchVideos();
  }, []);

  const handleDownload = async () => {
    if (!videoUrl) {
      alert("Please enter a valid Instagram video URL.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/videos/download", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: videoUrl,
      });

      if (!response.ok) {
        throw new Error("Failed to download video.");
      }

      alert("Video download initiated. Refresh the page to see the video embedded.");

      setVideoUrl(""); // Clear the input field after the download
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Error downloading video. Please try again.");
    }
  };

  return (
    <div className="download-form">
      <h2>Download Instagram Video</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Instagram video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button onClick={handleDownload}>Download</button>
      </div>

      <div>
        <h2>Available Videos</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="video-list">
          {videos.map((video, index) => (
            <div key={index} className="video-item">
              <h3>{video}</h3>
              <video controls width="400">
                <source
                  src={`http://localhost:8080/api/files/download/${encodeURIComponent(video)}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrishyamHome;
