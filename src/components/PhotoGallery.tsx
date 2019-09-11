import React from "react";
import { List, Card, Layout, Icon, Modal, Col, Select } from "antd";
import { Photo, Favorites } from "../redux/photos/types";
import { addToFavorite, requestFetchPhotos, photosVisibilityFilter } from "../redux/photos/actions";

import ViewPhoto from "./ViewPhoto";

interface PhotoProps {
  photos: Photo[];
  favorites: Photo[];
  loading: boolean;
  addToFavorite: typeof addToFavorite;
  photosVisibilityFilter: typeof photosVisibilityFilter;
  requestFetchPhotos: typeof requestFetchPhotos;
}
const { Header, Content } = Layout;
const { Option } = Select;
class PhotoGallery extends React.Component<PhotoProps> {
  state = {
    modalVisible: false,
    selectedPhoto: {}
  };

  handleFavorite = (e: any, item: Favorites) => {
    e.stopPropagation();
    const { addToFavorite } = this.props;
    addToFavorite(item.id, item.albumId);
  };

  handleFilter = (value: string) => {
    const { photosVisibilityFilter } = this.props;
    photosVisibilityFilter(value);
  };

  showModal = (id: number) => {
    const { photos } = this.props;
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

  getFavoriteIcon = (id: number) => {
    const { favorites } = this.props;
    const result = favorites.filter(item => item.id === id);
    if (result.length > 0) {
      return true;
    }
    return false;
  };

  render() {
    const { photos, loading } = this.props;
    const { modalVisible, selectedPhoto } = this.state;

    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%", color: "#fff" }}>
          <Col span={20}> Photo Gallery</Col>
          <Col span={4}>
            <Select defaultValue="All Photos" onChange={this.handleFilter}>
              <Option value="all">All Photos</Option>
              <Option value="favorite">Favorite Photos</Option>
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
              loading={loading}
              style={{ top: "80px" }}
              dataSource={photos}
              renderItem={item => (
                <List.Item>
                  <Card title={item.title} onClick={() => this.showModal(item.id)}>
                    <img width={150} alt={item.title} src={item.thumbnailUrl} />
                    <div>
                      <Icon
                        type="star"
                        theme={this.getFavoriteIcon(item.id) ? "filled" : "outlined"}
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
            <ViewPhoto selectedPhoto={selectedPhoto}></ViewPhoto>
          </Modal>
        </Content>
      </Layout>
    );
  }
}

export default PhotoGallery;
