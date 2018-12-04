class Songs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};

    }
  
    createSongElements (songs) {
  
      return (
        songs
        .map(function createSongElements(song) {
          return (<SongElement key={song.service_id}
                               song={song}
                               setSelectedSong={this.props.setSelectedSong} />);
        }.bind(this))
        .reverse()
      );
    }
  
    render () {
      let songs = this.props.songs;
      let songElements = this.createSongElements(songs);
  
      return (
        <div>
          <h3 className="page-header">
  
            <div>
                Songs
            </div>
  
          </h3>
          <ul>
  
            {songElements.length > 0 ? songElements : <NoSongElement />}
  
          </ul>
        </div>
      );
    }
  }