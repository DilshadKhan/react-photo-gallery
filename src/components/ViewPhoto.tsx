import React from 'react';
import { Card } from 'antd';
import { PhotoState } from '../redux/photos/types';

interface PhotoProps {
  photo: PhotoState;
  selectedPhoto: any;
}

class ViewPhoto extends React.Component<PhotoProps> {
  render() {
    const { selectedPhoto } = this.props;

    return (
      <Card title={selectedPhoto.title} style={{ textAlign: 'center' }}>
        <img alt={selectedPhoto.title} src={selectedPhoto.url} />
      </Card>
    );
  }
}

export default ViewPhoto;
