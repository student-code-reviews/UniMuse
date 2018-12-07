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
        <div className="row">

          <div className="search-result-element-title col-8">
            <p className="panel-body">
              <img className="song-image" src={song.albumImgURLsm}></img>
            
              {song.songTitle}
            </p>
          </div>

          <div className="col-4">
            <button type="submit" onClick={this.handleAddSongSubmitEvent}
              className="search-result-element-btn btn btn-primary raised">
                <i className="fa fa-plus"></i>
            </button>
          </div>

        </div>
      </div>
    );
  }
}
