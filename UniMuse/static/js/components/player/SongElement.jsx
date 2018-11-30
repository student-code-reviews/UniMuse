class SongElement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      
      // Bindings
      this.handlePlaySongClick = this.handlePlaySongClick.bind(this);
    }

    handlePlaySongClick () {
      let songData = this.props.songData;
      this.props.setSelectedSong(songData);
    }
  
    render () {
      let songData = this.props.songData;
  
      return (
        <div className="panel panel-primary">
          <div className="panel-footer">

              <button type="button" className="btn btn-default btn-xs" onClick={this.handlePlaySongClick}>
                {songData.song_name}
              </button>

            <p />
          </div>
        </div>
      );
    }
  }
  