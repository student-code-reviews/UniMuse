class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    // Bindings
    this.checkSongSource = this.checkSongSource.bind(this);
  }

  checkSongSource () {
    let SongData = this.props.currentSongData
    let currentSongService = this.props.currentSongData.service;
    console.log(SongData.service_id);

    if (currentSongService == 'spotify') {
      return `https://open.spotify.com/embed/track/${SongData.service_id}`;
    } else if (currentSongService == 'youtube') {
      return `https://www.youtube.com/embed/${SongData.service_id}`;
    } else {
      return `https://api.mixcloud.com/${SongData.service_id}/embed-html/`
    }
  }

  render () {
    let url = this.checkSongSource();
    console.log(url)
    
    return (
      <div>
        <iframe src={url} width="500" height="380" 
          frameBorder="0" allowtransparency="true" allow="encrypted-media">
        </iframe>
      </div>
    );
  }
}
  