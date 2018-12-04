class PlaylistsSongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Bindings
    this.createPlaylistElements = this.createPlaylistElements.bind(this);
  }

  createPlaylistElements (userPlaylists) {
    return (
      userPlaylists
      .map(function createPlaylistElements(playlist) {
        return (<PlaylistElement key={playlist.playlist_no} 
                                 playlist={playlist} 
                                 setSelectedPlaylist={this.props.setSelectedPlaylist} />);
      }.bind(this))
      .reverse()
    );
  }

  render () {
    let userPlaylists = this.props.userPlaylists;
    let playlistElements = this.createPlaylistElements(userPlaylists);

    return (
      <div>
        <h3 className="page-header">

          <div>
              Playlists
          </div>

        </h3>
        <ul>

          {playlistElements.length > 0 ? playlistElements : <NoPlaylistElement />}

        </ul>
      </div>
    );
  }
}