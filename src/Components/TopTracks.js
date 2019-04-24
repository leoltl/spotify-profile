import React, { Component } from "react";

export default class TopTracks extends Component {
  componentDidMount() {
    fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer BQB9vekEK3kFrhRnq7p5owaiV8KOq08vXE-ilJ5Y14dSfdJxHgiqaGnd0jz4AtEfJ167GvtlMJh5-ysDrWTfm0ktHqsulIQ2b4DWDySF3Ntb3tRiDzVK72mEIF68Vl_D_RBJckcU1N4VMFnM6KXBdSShm3z9ZJDa6e8na3F3CwEqq8YM4rjkJ63oyzJhjCGWpaUgrUPSl80WZHj46oXQ8IWIDidNQD0SXyxTP2EVHusLX1cpBxlL1_qqahhZrz6lTdoPxbcZrQZtQiQ"
      }
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
  render() {
    return <div />;
  }
}
