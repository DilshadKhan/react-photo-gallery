import React from 'react';
import { connect } from 'react-redux';
import { Photo } from './redux/photos/types';
import {
  requestFetchPhotos,
  addToFavorite,
  requestViewPhoto,
  photosVisibilityFilter
} from './redux/photos/actions';
import './App.css';
import PhotoGallery from './components/PhotoGallery';
import { getVisiblePhotos } from './selectors';

interface AppProps {
  photos: Photo[];
  requestFetchPhotos: typeof requestFetchPhotos;
  addToFavorite: typeof addToFavorite;
  requestViewPhoto: typeof requestViewPhoto;
  photosVisibilityFilter: typeof photosVisibilityFilter;
  favorites: Photo[];
  loading: boolean;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    const { requestFetchPhotos } = this.props;
    requestFetchPhotos();
  }
  render() {
    const {
      photos,
      addToFavorite,
      photosVisibilityFilter,
      requestFetchPhotos,
      favorites,
      loading
    } = this.props;

    return (
      <div>
        <PhotoGallery
          photos={photos}
          favorites={favorites}
          loading={loading}
          addToFavorite={addToFavorite}
          requestFetchPhotos={requestFetchPhotos}
          photosVisibilityFilter={photosVisibilityFilter}
        />
      </div>
    );
  }
}

// @ts-ignore
const mapStateToProps = state => ({
  photos: getVisiblePhotos(state),
  favorites: state.photo.favorites,
  loading: state.photo.loading
});

export default connect(
  mapStateToProps,
  {
    requestFetchPhotos,
    addToFavorite,
    requestViewPhoto,
    photosVisibilityFilter
  }
)(App);
