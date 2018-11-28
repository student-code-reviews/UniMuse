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
    let url;

    if (currentSongService === 'spotify') {
      url = `https://open.spotify.com/embed/track/${SongData.service_id}`
    } else {
    }

    return url
  }

  render () {
    let url = this.checkSongSource();

    return (
      <div>
        { url ? <iframe src={url} width="500" height="380" 
        frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> :
        null }
      </div>
    );
  }
}
  