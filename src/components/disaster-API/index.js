import React, { useState, useEffect } from 'react';

const DisasterComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async (word) => {
      try {
        const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=37353aa32dcc44940&q=${word}&searchType=image&rights=(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial|cc_nonderived)`);
        const data = await res.json();
        setImages(data.items); // Google Custom Search API returns search results in 'items' array
        console.log(data.items)
      } catch (error) {
        console.log(error);
        setImages([]); // Set images to an empty array in case of error
      }
    };

    getImages("earthquake damage");
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div>
      <h1>Creative Commons Earthquake Disaster Images</h1>
      <div className="Images">
        {Array.isArray(images) && images.length > 0 ? (
          images.map((item, index) => (
            <div key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.image.thumbnailLink} alt={item.title} />
              </a>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
      <pre>{JSON.stringify(images, null, 2)}</pre>
      <footer>Disaster Data Research 2024</footer>
    </div>
  );
};

export default DisasterComponent;