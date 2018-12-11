class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlaylist: this.props.selectedPlaylist,
      songs: [],
      currentSong: {},
      songClicked: false
    };

    this.goBackFromPlayer = this.goBackFromPlayer.bind(this);
    this.setSelectedSong = this.setSelectedSong.bind(this);
  }

  componentDidMount () {
    let playlistNo = this.state.selectedPlaylist.playlist_no;

    fetch(`/playlist-songs.json?playlist=${playlistNo}`)
    .then(res => res.json())
    .then(data => {
      this.setState({ songs: data.songs });
    })
    .catch(err => {
      this.setState({ songs: [] })
      console.error('error', playlistNo, err)
    });
  }

  goBackFromPlayer () {
    this.props.revertPlaylistPlayerRender();
  }

  setSelectedSong (song) {
    this.setState({ currentSong: song, songClicked: true })
  }

  render() {
    let songs = this.state.songs;
    let playlistName = this.state.selectedPlaylist.playlist_name;
    let currentSong = this.state.currentSong;
    let songClicked = this.state.songClicked;

    return (
      <div>

        <div className="player-back-btn row">
          <div className="col-sm-6">
            <p />
            <button id="backFromPlayerBtn" className="btn btn-primary raised" 
              type="button" onClick={this.goBackFromPlayer}>Go Back</button>
          </div>

          <div className="col-sm-6">
            <h3 className="playlist-header page-header">
              <strong>Playlist: {playlistName}</strong>
            </h3>
          </div>
        </div>

        <div className="player-songs-row row">
          <div className="player col-sm-6">
            {songClicked ? <Player currentSong={currentSong} /> : null}
          </div>

          <div className="col-sm-6">
            <hr />
            <Songs songs={songs} 
                  setSelectedSong={this.setSelectedSong} />
          </div>
        </div>
        
      </div>
    );
  }
}
