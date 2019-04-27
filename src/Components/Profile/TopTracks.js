import React from "react";
import TrackList from "../_test/TrackList";
import { Link } from "react-router-dom";

import ListHeader from "../../UI/ListHeader";
import Button from "../../UI/Button";
import ListRail from "../../UI/ListRail";

import FetchData from "../FetchData";

const TopTracks = () => {
  return (
    <FetchData
      url="/me/top/tracks"
      method="get"
      params={{ time_range: "long_term", limit: 10 }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return <ListRail>{loading}</ListRail>;
        }
        if (error) {
          console.error(error);
          return;
        }
        return (
          <ListRail className="top-track">
            <ListHeader>
              <h2>Top Tracks of All Time</h2>
              <Button className="button">
                <Link to="/tracks">See more</Link>
              </Button>
            </ListHeader>
            <TrackList render={data.items} />
          </ListRail>
        );
      }}
    </FetchData>
  );
};

export default TopTracks;
