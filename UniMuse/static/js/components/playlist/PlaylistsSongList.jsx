class PlaylistsSongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Bindings
  }

  render () {

    return (
      <div>
        <h3 className="page-header">

          <div>
              Playlists
          </div>

        </h3>
        <ul>

          <NoPlaylistElement />

        </ul>
      </div>
    );
  }
}