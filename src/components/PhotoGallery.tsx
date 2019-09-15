import React from "react";
import { List, Icon, Modal, Typography } from "antd";
import { Photo, Pagination } from "../redux/photos/types";
import { addToFavorite, requestFetchPhotos } from "../redux/photos/actions";
import ViewPhoto from "./ViewPhoto";
import "./PhotoGallery.css";

interface PhotoProps {
  photos: Photo[];
  addToFavorite: typeof addToFavorite;
  requestFetchPhotos: typeof requestFetchPhotos;
  loading: boolean;
  pagination: Pagination | null;
}

class PhotoGallery extends React.Component<PhotoProps> {
  state = {
    modalVisible: false,
    selectedPhoto: {}
  };

  handleFavorite = (e: any, photo: Photo) => {
    e.stopPropagation();
    const { addToFavorite } = this.props;
    addToFavorite(photo);
  };

  viewPhoto = (photo: Photo) => {
    const { photos } = this.props;
    const foundPhoto = photos.find(item => {
      return item.id === photo.id && item.albumId === photo.albumId;
    });

    if (foundPhoto) {
      this.setState({
        modalVisible: true,
        selectedPhoto: foundPhoto
      });
    }
  };

  handleOk = () => {
    this.setState({
      modalVisible: false
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { photos, loading, pagination, requestFetchPhotos } = this.props;
    const { modalVisible, selectedPhoto } = this.state;
    return (
      <React.Fragment>
        <div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 4
            }}
            pagination={
              pagination
                ? {
                    ...pagination,
                    onChange: page => {
                      requestFetchPhotos({ ...pagination, page });
                    }
                  }
                : false
            }
            className='mzh-gallery'
            loading={loading}
            dataSource={photos}
            renderItem={item => (
              <List.Item>
                <div className='photo-item' onClick={() => this.viewPhoto(item)}>
                  <Icon className='photo-item-favorite' type='star' theme={item.favorite ? "filled" : "outlined"} key={item.id} onClick={e => this.handleFavorite(e, item)} />
                  <div className='photo-item-img-ct'>
                    <img alt={item.title} src={item.thumbnailUrl} />
                  </div>
                  <div className='photo-item-title'>
                    <Typography.Title level={4} ellipsis>
                      {item.title}
                    </Typography.Title>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
        <Modal visible={modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null} width={700}>
          <ViewPhoto selectedPhoto={selectedPhoto}></ViewPhoto>
        </Modal>
      </React.Fragment>
    );
  }
}

export default PhotoGallery;
