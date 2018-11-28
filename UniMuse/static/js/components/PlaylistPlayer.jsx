class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistSongsDataAll: {}
    };

    // Bindings
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
          Hello!
          </div>
          <div className="col-sm-6">

          </div>
          <div className="col-sm-6">

          </div>
          <div className="col-sm-6">
            
            {/* <SongList playlistSongsDataAll={playlistSongsDataAll} /> */}

          </div>
        </div>
      </div>
    );
  }
}
