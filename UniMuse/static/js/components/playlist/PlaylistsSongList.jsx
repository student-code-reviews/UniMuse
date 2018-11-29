class PlaylistsSongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Bindings
    this.createPlaylistDataElements = this.createPlaylistDataElements.bind(this);
  }

  createPlaylistDataElements (playlistsDataAll) {
    return (
      playlistsDataAll
      .map(function createPlaylistDataElements(playlist) {
        return (<PlaylistElement key={playlist.playlist_no} 
                                 playlistData={playlist} 
                                 setSelectedPlaylist={this.props.setSelectedPlaylist} />);
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