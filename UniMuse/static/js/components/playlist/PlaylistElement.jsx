class PlaylistElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    let playlistData = this.props.playlistData;

    return (
      <p>
          <strong>{playlistData.playlist_name}</strong>
      </p>
    );
  }
}