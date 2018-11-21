class PlaylistsSongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Bindings
    this.getPlaylistsDataAllKeys = this.getPlaylistsDataAllKeys.bind(this);
    this.createPlaylistDataElements = this.createPlaylistDataElements.bind(this);
  }

  getPlaylistsDataAllKeys (playlistsDataAll) {
    return Object.keys(playlistsDataAll)
  }

  createPlaylistDataElements (playlistsDataAll) {
    let playlistData;

    return (
      this
      .getPlaylistsDataAllKeys(playlistsDataAll)
      .map(function createPlaylistDataElements(playlist_no) {
        playlistData = playlistsDataAll[playlist_no];
        // console.log(playlistData)
        return (<PlaylistElement key={playlist_no} playlistData={playlistData} />);
      }.bind(this))
      .reverse()
    );
  }

  render () {
    let playlistsDataAll = this.props.playlistsDataAll;
    let playlistDataElements = this.createPlaylistDataElements(playlistsDataAll);

    return (
      <div>
        <h3 className="page-header">

          <div>
              Playlists
          </div>

        </h3>
        <ul>

          {playlistDataElements.length > 0 ? playlistDataElements : <NoPlaylistElement />}

        </ul>
      </div>
    );
  }
}