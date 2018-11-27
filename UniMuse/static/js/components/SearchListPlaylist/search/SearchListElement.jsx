class SearchListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Bindings
    this.handleAddSongSubmitEvent = this.handleAddSongSubmitEvent.bind(this);
  }

  handleAddSongSubmitEvent (evt) {
    evt.preventDefault();

    let songData = this.props.searchListData;
    this.props.saveSongToPlaylist(songData);
  }

  render () {
    let searchListData = this.props.searchListData;

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          {searchListData.songTitle}
        </div>

        <p className="panel-body">
          <img src={searchListData.albumImgURLsm}></img>
          <strong>Artist:</strong> {searchListData.artistName}
          <strong> Album:</strong> {searchListData.albumName}
        </p>

        <div className="panel-footer">
          <form className="form-inline" onSubmit={this.handleAddSongSubmitEvent}>
            <button type="submit" className="btn btn-default btn-xs">Add to playlist</button>
            {/* <button type="button" className="btn btn-default btn-xs">Play Song</button> */}
          </form>
        </div>
      </div>
    );
  }
}
