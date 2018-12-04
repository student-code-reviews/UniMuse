class SearchResElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleAddSongSubmitEvent = this.handleAddSongSubmitEvent.bind(this);
  }

  handleAddSongSubmitEvent (evt) {
    evt.preventDefault();

    let song = this.props.song;
    this.props.saveSongToPlaylist(song);
  }

  render () {
    let song = this.props.song;

    return (
      <div className="panel panel-primary">

        <p className="panel-body">
          <img src={song.albumImgURLsm}></img>
          {song.songTitle}
        </p>

        <form className="form-inline" onSubmit={this.handleAddSongSubmitEvent}>
            <button type="submit" className="btn btn-default btn-xs">
              <i className="fa fa-spotify"></i>Add to playlist
            </button>
        </form>
        
      </div>
    );
  }
}
