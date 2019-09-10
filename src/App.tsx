import React from 'react';
import { connect } from 'react-redux';
import { AppState } from './redux/store';
import { PhotoState } from './redux/photos/types';
import {
  requestFetchPhotos,
  addToFavorite,
  requestViewPhoto,
  togglePhotosFilter
} from './redux/photos/actions';
import './App.css';
import PhotoGallery from './components/PhotoGallery';

interface AppProps {
  photo: PhotoState;
  requestFetchPhotos: typeof requestFetchPhotos;
  addToFavorite: typeof addToFavorite;
  requestViewPhoto: typeof requestViewPhoto;
  togglePhotosFilter: typeof togglePhotosFilter;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    const { requestFetchPhotos } = this.props;
    requestFetchPhotos();
  }
  render() {
    const {
      photo,
      addToFavorite,
      togglePhotosFilter,
      requestFetchPhotos
    } = this.props;

    return (
      <div>
        <PhotoGallery
          photo={photo}
          selectedFilter='all'
          addToFavorite={addToFavorite}
          togglePhotosFilter={togglePhotosFilter}
          requestFetchPhotos={requestFetchPhotos}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  photo: state.photo
});

export default connect(
  mapStateToProps,
  { requestFetchPhotos, addToFavorite, requestViewPhoto, togglePhotosFilter }
)(App);
