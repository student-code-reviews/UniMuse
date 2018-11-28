class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlaylist: this.props.selectedPlaylist,
      songsDataAll: {}
    };

    // Bindings
    this.goBackFromPlayer = this.goBackFromPlayer.bind(this);
  }

  componentDidMount () {
    let playlistNo = this.state.selectedPlaylist.playlist_no;

    fetch(`/playlist-songs.json?playlist=${playlistNo}`)
      .then(res => res.json())
      .then(data => {
        let songsDataAll = {};
        for (let key of Object.keys(data)) {
          let playlistSongData = {
            song_no: key,
            song_uri: data[key]['service_id'],
            song_source: data[key]['service']
          };
          songsDataAll[key] = playlistSongData;
        };
        
        this.setState( {songsDataAll: songsDataAll} );
        console.log(this.state.songsDataAll);
      })
    .catch(err => this.setState({ songsDataAll: "Something went wrong with user's playlists songs."}));
  }

  goBackFromPlayer () {
    this.props.revertPlaylistPlayerRender();
  }

  render() {
    let songsDataAll = this.state.songsDataAll;
    let playlistName = this.state.selectedPlaylist.playlist_name;

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

            <h3>Player section</h3>

          </div>
          <div className="col-sm-6">
            
            <Songs songsDataAll={songsDataAll} />

          </div>
        </div>
      </div>
    );
  }
}
