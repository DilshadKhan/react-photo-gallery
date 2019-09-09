import React from "react";
import { connect } from "react-redux";
import { AppState } from "./redux/store";
import { PhotoState } from "./redux/photos/types";
import { requestFetchPhotos, requestViewPhoto } from "./redux/photos/actions";
import "./App.css";
import PhotoGallery from "./components/PhotoGallery";

interface AppProps {
  photo: PhotoState;
  requestFetchPhotos: typeof requestFetchPhotos;
  requestViewPhoto: typeof requestViewPhoto;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    const { requestFetchPhotos } = this.props;
    requestFetchPhotos();
  }
  render() {
    const { photo } = this.props;
    return (
      <div>
        <PhotoGallery photos={photo.photos} selectedFilter='all' />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  photo: state.photo
});

export default connect(
  mapStateToProps,
  { requestFetchPhotos, requestViewPhoto }
)(App);
