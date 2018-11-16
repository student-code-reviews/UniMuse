class PlaylistForm extends React.Component {
	constructor(props) {
		super(props);
    this.state = {};
    
    // Bindings
  }
  
  // PLACEHOLDER FOR CREATE HANDLER

  render () {

    return (
      <div>

        <h3 className="page-header"><strong>Playlists</strong></h3>

        <button type="button" className="btn btn-primary" data-toggle="collapse" 
                data-target="#createplaylistform">Create New Playlist</button>

        <div id="createplaylistform" className="collapse">

          <label htmlFor="createPlaylistBoxLabel">New Playlist Name 
                <span style={styleRequired}>*</span></label>
          <input type="text" className="form-control" placeholder="Enter new playlist name" 
                required ref="new-playlist" />

        </div>

        <hr />

        <div className="form-group">
          <div className="row">
            <div className="col-xs-5 col-sm-6 col-md-4">
            </div>
          </div>
        </div>

      </div>
    );
  }
}