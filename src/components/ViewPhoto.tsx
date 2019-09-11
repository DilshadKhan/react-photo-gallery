import React from 'react';
import { Card } from 'antd';

interface PhotoProps {
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
