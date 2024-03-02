import React from 'react';
import Video  from '../../assets/video/prince.mp4';
import './video.css'

export class VideoComponent1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTitle: 'Обяснение за Принца',
      isPlaying: false
    };
  }
  handlePlayPause = () => {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying
    }));
  };

  render() {
    const { videoTitle, isPlaying } = this.state;

    return (
      <div>
        <h1 className='Title'>{videoTitle}</h1>
        <video width="640" height="360" controls onClick={this.handlePlayPause}>
          <source src={Video} type="video/mp4" />
          
        </video>
        {/* <button onClick={this.handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button> */}
      </div>
    );
  }
}

