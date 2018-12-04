class PlaylistElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.handlePlaylistSelectEvent = this.handlePlaylistSelectEvent.bind(this);
  }

  handlePlaylistSelectEvent (evt) {
    evt.preventDefault();
    
    let currentSelectedPlaylist = this.props.playlist;
    this.props.setSelectedPlaylist(currentSelectedPlaylist);
  }

  render () {
    let playlist = this.props.playlist;

    return (
      <div className="panel panel-primary">

        <div className="panel-footer">
          <form className="form-inline" onSubmit={this.handlePlaylistSelectEvent}>
            <button type="submit" className="btn btn-default btn-xs">{playlist.playlist_name}</button>
          </form>
          <p />
        </div>
        
      </div>
    );
  }
}
