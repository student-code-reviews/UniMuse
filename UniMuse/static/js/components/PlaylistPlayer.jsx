class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlaylist: this.props.selectedPlaylist,
      playlistSongsDataAll: {}
    };

    // Bindings
    this.goBackFromPlayer = this.goBackFromPlayer.bind(this);
  }

  goBackFromPlayer () {
    this.props.revertPlaylistPlayerRender();
  }

  render() {
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
            
            <h3>Song list section</h3>

          </div>
        </div>
      </div>
    );
  }
}
