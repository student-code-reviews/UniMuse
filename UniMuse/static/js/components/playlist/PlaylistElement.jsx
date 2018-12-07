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
          <button type="button" className="playlist-buttons btn btn-default btn-xs" 
             onClick={this.handlePlaylistSelectEvent}>{playlist.playlist_name}</button>
          <p />
        </div>
        
      </div>
    );
  }
}
