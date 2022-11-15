import { useState } from "react";
import axios from "axios";
import Images from "./Images";
import Loading from "./Loading";
function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const handleSubmit = async (e) => {
    if (!query) {
      return;
    }
    setImages([]);
    setLoading(true);
    try {
      const response = await axios.post("/create", { prompt: query });
      setImages(response.data.data);
    } catch (error) {
      setImages([]);
    }

    setLoading(false);
  };

  return (
    <div className="main">
      <h1 className="title">Create Image AI</h1>

      <input
        type="text"
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="submit" onClick={handleSubmit} disabled={loading}>
        Generate
      </button>
      {loading && <Loading />}
      {images.length > 0 && <Images images={images} query={query} />}
    </div>
  );
}

export default App;
