class SongElement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      
      // Bindings
    }
  
    render () {
      let songData = this.props.songData;
  
      return (
        <div className="panel panel-primary">
          <div className="panel-footer">
            <form className="form-inline" onSubmit={this.handlePlaylistSelectEvent}>
              <button type="submit" className="btn btn-default btn-xs">{songData.song_uri}</button>
            </form>
            <p />
          </div>
        </div>
      );
    }
  }
  