class PlaylistElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
  
    }
  
    render () {
      let playlistData = this.props.playlistData;
  
      return (
        <div className="panel panel-primary">
          <div className="panel-footer">
            <form className="form-inline">
              <button type="button" className="btn btn-default btn-xs">{playlistData.playlist_name}</button>
            </form>
          </div>
        </div>
      );
    }
  }
  