import React from "react";
import Artist from "./Artist";

const ArtistList = props => {
  const { render } = props;
  return (
    <>
      {render.map(item => (
        <Artist
          imgURL={item.images[2].url}
          name={item.name}
          key={item.id}
          artistId={item.id}
        />
      ))}
    </>
  );
};

export default ArtistList;
