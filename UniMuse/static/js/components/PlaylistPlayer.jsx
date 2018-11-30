class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlaylist: this.props.selectedPlaylist,
      songsDataAll: [],
      currentSongData: {},
      songClicked: false
    };

    // Bindings
    this.goBackFromPlayer = this.goBackFromPlayer.bind(this);
    this.setSelectedSong = this.setSelectedSong.bind(this);
  }

  componentDidMount () {
    let playlistNo = this.state.selectedPlaylist.playlist_no;

    fetch(`/playlist-songs.json?playlist=${playlistNo}`)
      .then(res => res.json())
      .then(data => {
        this.setState( {songsDataAll: data.songs} );
      })
    .catch(err => this.setState({ songsDataAll: "Something went wrong with user's playlists songs."}));
  }

  goBackFromPlayer () {
    this.props.revertPlaylistPlayerRender();
  }

  setSelectedSong (songData) {
    this.setState({ currentSongData: songData , songClicked: true })
  }

  render() {
    let songsDataAll = this.state.songsDataAll;
    let playlistName = this.state.selectedPlaylist.playlist_name;
    let currentSongData = this.state.currentSongData;
    let songClicked = this.state.songClicked;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            <p />
              <button id="backFromPlayerBtn" type="button" className="btn btn-primary" 
                      onClick={this.goBackFromPlayer}>Go Back</button>

          </div>
          <div className="col-sm-6">

            <h3 className="page-header"><strong>{playlistName}</strong></h3>
            <p />
            <hr />

          </div>
          <div className="col-sm-6">

            {songClicked ? <Player currentSongData={currentSongData} /> : null} 

          </div>
          <div className="col-sm-6">
            
            <Songs songsDataAll={songsDataAll} 
                   setSelectedSong={this.setSelectedSong} />

          </div>
        </div>
      </div>
    );
  }
}
