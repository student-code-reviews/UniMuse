class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
  
    }
  
    // handleAddtoPlaylistSubmitEvent (evt) {
    //   evt.preventDefault();
    // }

    // handlePlaySongSubmitEvent (evt) {
    //   evt.preventDefault();
    // }
  
    render () {
      let result = this.props.result;

      return (
        <div className="panel panel-primary">
          <div className="panel-heading">
            {result.songTitle}
          </div>
  
          <p className="panel-body">
            <img src={result.albumImgURLsm}></img>
            <strong>Artist:</strong> {result.artistName}
            <strong> Album:</strong> {result.albumName}
          </p>
  
          <div className="panel-footer">
            <form className="form-inline">
              <button type="add-to-playlist" className="btn btn-default btn-xs">Add to playlist</button>
              <button type="search-player" className="btn btn-default btn-xs">Play Song</button>
            </form>
          </div>
        </div>
      );
    }
  }
  