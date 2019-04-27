import React from "react";

import TrackList from "../Common/TrackList";
import TopHeader from "./TopHeader";

import FetchData from "../Common/FetchData";

const TopTracks = () => {
  return (
    <FetchData
      url="/me/top/tracks"
      method="get"
      params={{ time_range: "long_term", limit: 10 }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return <div>{loading}</div>;
        }
        if (error) {
          console.error(error);
          return;
        }
        return (
          <div className="top-track">
            <TopHeader title="Top Tracks of All Time" to="/tracks" />
            <TrackList render={data.items} />
          </div>
        );
      }}
    </FetchData>
  );
};

export default TopTracks;
