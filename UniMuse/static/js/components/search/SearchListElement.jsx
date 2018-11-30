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

        <p className="panel-body">
          <img src={searchListData.albumImgURLsm}></img>
          {searchListData.songTitle}
        </p>

        <form className="form-inline" onSubmit={this.handleAddSongSubmitEvent}>
            <button type="submit" className="btn btn-default btn-xs"><i className="fa fa-spotify"></i>Add to playlist</button>
        </form>
        
      </div>
    );
  }
}
