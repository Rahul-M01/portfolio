import React, { useState, useEffect } from "react";
import "./drishyam_home.css";

// Configured at build time. Unset means this deployment has no backend, so the
// page says so rather than firing blocked mixed-content calls at localhost.
const API = process.env.REACT_APP_DRISHYAM_API;

const DrishyamHome = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!API) {
      setError("The Drishyam backend isn't reachable from this deployment.");
      return;
    }

    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API}/api/files/list`, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch videos.");
        const data = await response.json();
        setVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Couldn't load the library. Try again.");
      }
    };

    fetchVideos();
    return () => controller.abort();
  }, []);

  const handleDownload = async () => {
    setNotice("");
    setError("");

    if (!API) {
      setError("The Drishyam backend isn't reachable from this deployment.");
      return;
    }
    if (!videoUrl.trim()) {
      setError("Enter a video URL first.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`${API}/api/videos/download`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        credentials: "include",
        body: videoUrl,
      });
      if (!response.ok) throw new Error("Failed to download video.");
      setNotice("Download started. Refresh to see it in the library.");
      setVideoUrl("");
    } catch (err) {
      setError("Couldn't start that download. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="download-form">
      <h2>Add a video</h2>
      <div>
        <label htmlFor="video-url" className="sr-only">Video URL</label>
        <input
          id="video-url"
          type="url"
          placeholder="Paste a video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button onClick={handleDownload} disabled={busy || !API}>
          {busy ? "Working" : "Download"}
        </button>
      </div>

      {error && <p className="dh-error" role="alert">{error}</p>}
      {notice && <p className="dh-notice">{notice}</p>}

      <div>
        <h2>Library</h2>
        <div className="video-list">
          {videos.map((video) => (
            <div key={video} className="video-item">
              <h3>{video}</h3>
              <video controls width="400" preload="none">
                <source
                  src={`${API}/api/files/download/${encodeURIComponent(video)}`}
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
