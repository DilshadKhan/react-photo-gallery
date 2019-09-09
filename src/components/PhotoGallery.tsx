import React from 'react';
import { List, Card, Layout, Icon } from 'antd';
import { PhotoState } from '../redux/photos/types';
import { addToFavorite } from '../redux/photos/actions';

interface PhotoProps {
  photo: PhotoState;
  selectedFilter: string;
  addToFavorite: typeof addToFavorite;
}
const { Header, Content } = Layout;
class PhotoGallery extends React.Component<PhotoProps> {
  handleFavorite = (item: { id: number; albumId: number }) => {
    const { addToFavorite } = this.props;
    addToFavorite(item.id, item.albumId);
  };

  render() {
    const {
      photo: { photos }
    } = this.props;
    console.log('props', this.props);
    return (
      <Layout>
        <Header
          style={{ position: 'fixed', zIndex: 1, width: '100%', color: '#fff' }}
        >
          Photo Gallery
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
              style={{ top: '80px' }}
              dataSource={photos}
              renderItem={item => (
                <List.Item>
                  <Card title={item.title}>
                    <img width={150} alt={item.title} src={item.thumbnailUrl} />
                    {/* {favorites.length > 0 ? (
                      favorites.includes(fav =>
                        fav.id === item.id;
                        return (
                          <Icon
                            type='star-o'
                            key={item.id}
                            onClick={() => this.handleFavorite(item)}
                          />
                        );
                      })
                    ) : ( */}
                    <Icon
                      type='star-o'
                      key={item.id}
                      onClick={() => this.handleFavorite(item)}
                    />
                    {/* )} */}
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default PhotoGallery;
