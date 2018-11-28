class Songs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
  
      // Bindings
    }
  
    getSongDataAllKeys (songsDataAll) {
      return Object.keys(songsDataAll)
    }
  
    createSongDataElements (songsDataAll) {
      let songData;
  
      return (
        this
        .getSongDataAllKeys(songsDataAll)
        .map(function createSongDataElements(song_no) {
          songData = songsDataAll[song_no];
          console.log(songData)
          return (<SongElement key={song_no}
                               songData={songData} />);
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