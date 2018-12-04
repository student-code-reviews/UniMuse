class SongElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.handlePlaySongClick = this.handlePlaySongClick.bind(this);
  }

  handlePlaySongClick () {
    let song = this.props.song;
    this.props.setSelectedSong(song);
  }

  render () {
    let song = this.props.song;

    return (
      <div className="panel panel-primary">

        <div className="panel-footer">
          <button type="button" className="btn btn-default btn-xs" onClick={this.handlePlaySongClick}>
            {song.song_name}
          </button>
          <p />
        </div>
        
      </div>
    );
  }
}
  