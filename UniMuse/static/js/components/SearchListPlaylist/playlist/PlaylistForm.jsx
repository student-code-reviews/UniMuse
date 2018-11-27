class PlaylistForm extends React.Component {
	constructor(props) {
		super(props);
    this.state = {};
    
    // Bindings
    this.handleCreatePlaylistSubmitEvent = this.handleCreatePlaylistSubmitEvent.bind(this);
    this.handleDeletePlaylistSubmitEvent = this.handleDeletePlaylistSubmitEvent.bind(this);
  }
  
  handleCreatePlaylistSubmitEvent (evt) {
    evt.preventDefault();
    let userNewPlaylist = this.refs.newPlaylistName.value;
    this.props.saveUserNewPlaylist(userNewPlaylist);
  }

  handleDeletePlaylistSubmitEvent (evt) {
    evt.preventDefault();
    this.props.deleteSelectedPlaylist();
  }

  render () {

    return (
      <div>

        <h3 className="page-header"><strong>Playlists</strong></h3>

        {/* Create New Playlist */}
        <button id="newPlaylistBtn" type="button" className="btn btn-primary" data-toggle="collapse" 
                data-target="#createplaylistform"><i className="fa fa-plus"></i></button>

        <div id="createplaylistform" className="collapse">

          <form onSubmit={this.handleCreatePlaylistSubmitEvent}>
            <label htmlFor="createPlaylistBoxLabel">New Playlist Name</label>
            <input type="text" className="form-control" placeholder="Enter new playlist name" 
                  required ref="newPlaylistName" />
            <p />
            <button type="submit" className="btn btn-default btn-xs">Create</button>
            <button type="reset" className="btn btn-link btn-xs" data-toggle="collapse" 
                data-target="#createplaylistform">Cancel</button>
          </form>

        </div>

        {/* Delete Selected Playlist */}
        <form onSubmit={this.handleDeletePlaylistSubmitEvent}>
          <button id="deletePlaylistBtn" type="submit" className="btn btn-primary"><i className="fa fa-minus"></i></button>
        </form>
        
        {/* Go to Selected Playlist */}
        <form onSubmit={this.handleGotoPlaylistSubmitEvent}>
          <button id="gotoPlaylistBtn" type="submit" className="btn btn-primary"><i className="fa fa-play"></i></button>
        </form>
        
        <p />
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