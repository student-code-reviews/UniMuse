class PlaylistElement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      
      // Bindings
      this.handlePlaylistSelectEvent = this.handlePlaylistSelectEvent.bind(this);
    }

    handlePlaylistSelectEvent (evt) {
      evt.preventDefault();
      let currentSelectedPlaylist = this.props.playlistData;
      this.props.setSelectedPlaylist(currentSelectedPlaylist);
    }
  
    render () {
      let playlistData = this.props.playlistData;
  
      return (
        <div className="panel panel-primary">
          <div className="panel-footer">
            <form className="form-inline" onSubmit={this.handlePlaylistSelectEvent}>
              <button type="submit" className="btn btn-default btn-xs">{playlistData.playlist_name}</button>
            </form>
            <p />
          </div>
        </div>
      );
    }
  }
  