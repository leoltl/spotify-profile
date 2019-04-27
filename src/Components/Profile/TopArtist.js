import React from "react";

import FetchData from "../Common/FetchData";
import ArtistList from "../Common/ArtistList";
import TopHeader from "./TopHeader";

const TopArtist = () => {
  return (
    <FetchData url="/me/top/artists" method="get" params={{ limit: 10 }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>{loading}</div>;
        }
        if (error) {
          console.error(error);
          return;
        }
        return (
          <div className="top-artist">
            <TopHeader title="Top Artists of All Time" to="/artists" />
            <ArtistList render={data.items} />
          </div>
        );
      }}
    </FetchData>
  );
};

export default TopArtist;
