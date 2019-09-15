import React from "react";
import { connect } from "react-redux";
import { Photo, Pagination } from "./redux/photos/types";
import { Layout, Select } from "antd";
import { requestFetchPhotos, addToFavorite, requestViewPhoto, photosVisibilityFilter } from "./redux/photos/actions";
import "./App.css";
import PhotoGallery from "./components/PhotoGallery";
import { getVisiblePhotos } from "./selectors";
import { AppState } from "./redux/store";

const { Header, Content, Footer } = Layout;

const availableFilters = [
  {
    value: "all",
    text: "All Photos"
  },
  {
    value: "favorite",
    text: "My Favorites"
  }
];

interface AppProps {
  photos: Photo[];
  requestFetchPhotos: typeof requestFetchPhotos;
  addToFavorite: typeof addToFavorite;
  requestViewPhoto: typeof requestViewPhoto;
  photosVisibilityFilter: typeof photosVisibilityFilter;
  loading: boolean;
  pagination: Pagination;
  selectedFilter: string;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    const { requestFetchPhotos, pagination } = this.props;
    requestFetchPhotos(pagination);
  }
  handlePhotoFilter = (value: string) => {
    const { photosVisibilityFilter } = this.props;
    photosVisibilityFilter(value);
  };
  renderPhotoFilters = () => {
    return availableFilters.map(filter => {
      return (
        <Select.Option key={`filter_${filter.value}`} value={filter.value}>
          {filter.text}
        </Select.Option>
      );
    });
  };
  getSelectedFilterText = () => {
    const { selectedFilter, photos, pagination } = this.props;
    const found = availableFilters.find(filter => filter.value === selectedFilter);
    if (found) {
      if (selectedFilter === "all") {
        let startCount = (pagination.page - 1) * pagination.pageSize;
        if (startCount <= 0) {
          startCount = 1;
        }
        let endCount = pagination.page * pagination.pageSize;
        if (endCount > pagination.total) {
          endCount = pagination.total;
        }
        return `${found.text}(${startCount} - ${endCount} of ${pagination.total})`;
      } else {
        return `${found.text}(${photos.length})`;
      }
    }
    return "";
  };

  render() {
    const { photos, addToFavorite, loading, pagination, requestFetchPhotos, selectedFilter } = this.props;

    return (
      <Layout className='layout'>
        <Header style={{ position: "fixed", width: "100vw", zIndex: 999 }}>
          <div className='logo'>Photo Gallery</div>
          <div style={{ float: "right" }}>
            <Select defaultValue='all' style={{ width: "200px" }} onChange={this.handlePhotoFilter}>
              {this.renderPhotoFilters()}
            </Select>
          </div>
        </Header>
        <Content style={{ padding: "20px 50px", marginTop: "70px" }}>
          <div style={{ margin: "10px 0px" }}>Showing - {this.getSelectedFilterText()}</div>
          <PhotoGallery photos={photos} loading={loading} addToFavorite={addToFavorite} pagination={selectedFilter === "all" ? pagination : null} requestFetchPhotos={requestFetchPhotos} />
        </Content>
        <Footer style={{ textAlign: "center" }}>Photo Gallery Example ©2019 Created by MindzHub</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  photos: getVisiblePhotos(state),
  loading: state.photo.loading,
  pagination: state.photo.pagination,
  selectedFilter: state.photo.selectedFilter
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
