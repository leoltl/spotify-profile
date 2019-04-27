import React from "react";

import Artist from "./Artist";
import Button from "../../UI/Button";
import ListHeader from "../../UI/ListHeader";
import ListRail from "../../UI/ListRail";
import { Link } from "react-router-dom";

import FetchData from "../FetchData";

const TopArtist = () => {
  return (
    <FetchData
      url="https://api.spotify.com/v1/me/top/artists?limit=10"
      method="GET"
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
          <ListRail className="top-artist">
            <ListHeader>
              <h2>Top Artists of All Time</h2>

              <Button className="button">
                <Link to="/artists">See more</Link>
              </Button>
            </ListHeader>
            {data.items.map(artist => (
              <Artist
                imgURL={artist.images[2].url}
                name={artist.name}
                key={artist.id}
                artistId={artist.id}
              />
            ))}
          </ListRail>
        );
      }}
    </FetchData>
  );
};

export default TopArtist;
