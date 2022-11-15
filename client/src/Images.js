import React from "react";

const Images = ({ images, query }) => {
  return (
    <div className="images">
      {images.map((image) => {
        return <img src={image.url} alt={query} key={image.url} />;
      })}
    </div>
  );
};

export default Images;
