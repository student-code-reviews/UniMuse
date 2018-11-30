class Songs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};

    }
  
    createSongDataElements (songsDataAll) {
  
      return (
        songsDataAll
        .map(function createSongDataElements(song) {
          return (<SongElement key={song.service_id}
                               songData={song}
                               setSelectedSong={this.props.setSelectedSong} />);
        }.bind(this))
        .reverse()
      );
    }
  
    render () {
      let songsDataAll = this.props.songsDataAll;
      let songDataElements = this.createSongDataElements(songsDataAll);
  
      return (
        <div>
          <h3 className="page-header">
  
            <div>
                Songs
            </div>
  
          </h3>
          <ul>
  
            {songDataElements.length > 0 ? songDataElements : <NoSongElement />}
  
          </ul>
        </div>
      );
    }
  }