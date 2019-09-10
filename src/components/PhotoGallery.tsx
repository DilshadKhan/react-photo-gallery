import React from 'react';
import { List, Card, Layout, Icon, Modal, Col, Select } from 'antd';
import { PhotoState } from '../redux/photos/types';
import {
  addToFavorite,
  togglePhotosFilter,
  requestFetchPhotos
} from '../redux/photos/actions';

import ViewPhoto from './ViewPhoto';

interface PhotoProps {
  photo: PhotoState;
  selectedFilter: string;
  addToFavorite: typeof addToFavorite;
  togglePhotosFilter: typeof togglePhotosFilter;
  requestFetchPhotos: typeof requestFetchPhotos;
}
const { Header, Content } = Layout;
const { Option } = Select;
class PhotoGallery extends React.Component<PhotoProps> {
  state = {
    modalVisible: false,
    selectedPhoto: {}
  };

  handleFavorite = (e: any, item: { id: number; albumId: number }) => {
    e.stopPropagation();
    const { addToFavorite } = this.props;
    addToFavorite(item.id, item.albumId);
  };

  handleFilter = (value: string) => {
    const { togglePhotosFilter, requestFetchPhotos } = this.props;

    if (value === 'favorite') {
      togglePhotosFilter(value);
    } else {
      requestFetchPhotos();
    }
  };

  showModal = (id: number) => {
    const {
      photo: { photos }
    } = this.props;
    const foundPhoto = photos.find(elem => {
      return elem.id === id;
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

  getFavoriteIcon = (id: number, albumId: number) => {
    const { photo } = this.props;
    const result = photo.favorites.filter(item => item.id === id);

    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { photo } = this.props;
    const { modalVisible, selectedPhoto } = this.state;

    return (
      <Layout>
        <Header
          style={{ position: 'fixed', zIndex: 1, width: '100%', color: '#fff' }}
        >
          <Col span={20}> Photo Gallery</Col>
          <Col span={4}>
            <Select defaultValue='All Photos' onChange={this.handleFilter}>
              <Option value='all'>All Photos</Option>
              <Option value='favorite'>Favorite Photos</Option>
            </Select>
          </Col>
        </Header>
        <Content>
          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3
              }}
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 12
              }}
              loading={photo.loading}
              style={{ top: '80px' }}
              dataSource={photo.photos}
              renderItem={item => (
                <List.Item>
                  <Card
                    title={item.title}
                    onClick={() => this.showModal(item.id)}
                  >
                    <img width={150} alt={item.title} src={item.thumbnailUrl} />
                    <div>
                      <Icon
                        type='star'
                        theme={
                          this.getFavoriteIcon(item.id, item.albumId)
                            ? 'filled'
                            : 'outlined'
                        }
                        key={item.id}
                        onClick={e => this.handleFavorite(e, item)}
                      />
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <Modal
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            width={700}
          >
            <ViewPhoto photo={photo} selectedPhoto={selectedPhoto}></ViewPhoto>
          </Modal>
        </Content>
      </Layout>
    );
  }
}

export default PhotoGallery;
