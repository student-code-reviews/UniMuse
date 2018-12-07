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
          <img className="song-image" src={song.albumImgURLsm}></img>
          
          {song.songTitle}

          <button type="submit" className="btn btn-primary raised"
            onClick={this.handleAddSongSubmitEvent}>
              <i className="fa fa-plus"></i>
          </button>
        </p>
      </div>
    );
  }
}
