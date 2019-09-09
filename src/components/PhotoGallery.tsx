import React from "react";
import { List, Card } from "antd";
import { Photo } from "../redux/photos/types";

interface PhotoProps {
  photos: Photo[];
  selectedFilter: string;
}

class PhotoGallery extends React.Component<PhotoProps> {
  render() {
    const { photos, selectedFilter } = this.props;
    return (
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
          dataSource={photos}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>
                <img width={150} alt={item.title} src={item.thumbnailUrl} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default PhotoGallery;
