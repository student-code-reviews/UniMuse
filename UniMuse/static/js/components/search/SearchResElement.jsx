class SearchResElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Bindings
    this.handleAddSongSubmitEvent = this.handleAddSongSubmitEvent.bind(this);
  }

  handleAddSongSubmitEvent (evt) {
    evt.preventDefault();

    let songData = this.props.songData;
    this.props.saveSongToPlaylist(songData);
  }

  render () {
    let songData = this.props.songData;

    return (
      <div className="panel panel-primary">

        <p className="panel-body">
          <img src={songData.albumImgURLsm}></img>
          {songData.songTitle}
        </p>

        <form className="form-inline" onSubmit={this.handleAddSongSubmitEvent}>
            <button type="submit" className="btn btn-default btn-xs"><i className="fa fa-spotify"></i>Add to playlist</button>
        </form>
        
      </div>
    );
  }
}
