import React from "react";
import { generateReqHeader } from "../utils";
import { BarLoader } from "react-spinners";

class FetchData extends React.Component {
  state = {
    data: null,
    loading: <BarLoader loading sizeUnit={"px"} size={150} color={"#1ed760"} />,
    error: ""
  };

  componentDidMount() {
    fetch(this.props.url, generateReqHeader())
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  render() {
    return this.props.children(this.state);
  }
}

export default FetchData;
