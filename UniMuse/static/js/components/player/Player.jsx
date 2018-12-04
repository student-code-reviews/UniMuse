class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.checkSongSource = this.checkSongSource.bind(this);
  }

  checkSongSource () {
    let song = this.props.currentSong;
    let currentSongService = this.props.currentSong.service;

    if (currentSongService == 'spotify') {
      return `https://open.spotify.com/embed/track/${song.service_id}`;
    } else if (currentSongService == 'youtube') {
      return `https://www.youtube.com/embed/${song.service_id}`;
    } else {
      return `https://api.mixcloud.com/${song.service_id}/embed-html/`;
    };
  }

  render () {
    let url = this.checkSongSource();
    
    return (
      <div>
        <iframe src={url} width="500" height="380" 
          frameBorder="0" allowtransparency="true" allow="encrypted-media">
        </iframe>
      </div>
    );
  }
}
  