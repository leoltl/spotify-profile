import React from "react";
import { BarLoader } from "react-spinners";
import axios from "axios";

class FetchData extends React.Component {
  state = {
    data: null,
    loading: <BarLoader loading sizeUnit={"px"} size={150} color={"#1ed760"} />,
    error: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        loading: (
          <BarLoader loading sizeUnit={"px"} size={150} color={"#1ed760"} />
        )
      });
      this.apiCall();
    }
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall = () => {
    let { method, url, params } = this.props;
    axios({
      method: method,
      url: url,
      baseURL: "https://api.spotify.com/v1/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      },
      params: params
    })
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    return this.props.children(this.state);
  }
}

export default FetchData;
