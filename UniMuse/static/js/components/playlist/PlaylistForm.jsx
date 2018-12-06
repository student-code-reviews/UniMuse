function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}


class PlaylistForm extends React.Component {
	constructor(props) {
		super(props);
    this.state = {};
    
    this.handleCreatePlaylistSubmitEvent = this.handleCreatePlaylistSubmitEvent.bind(this);
    this.handleDeletePlaylistSubmitEvent = this.handleDeletePlaylistSubmitEvent.bind(this);
    this.gotoPlaylistButtonClick = this.gotoPlaylistButtonClick.bind(this);
  }
  
  handleCreatePlaylistSubmitEvent (evt) {
    evt.preventDefault();

    let userNewPlaylist = this.refs.newPlaylistName.value;
    this.props.saveUserNewPlaylist(userNewPlaylist);
  }

  handleDeletePlaylistSubmitEvent (evt) {
    // evt.preventDefault();

    this.props.deleteSelectedPlaylist();
  }

  gotoPlaylistButtonClick () {
    this.props.playlistPlayerRender();
  }

  render () {

    return (
      <div>

        <h3 className="playlist-form-header page-header">
          <strong>Playlists</strong>
        </h3>

        <div className="divider-top"></div>

        <button id="newPlaylistBtn" type="button" className="btn btn-primary raised" 
          data-toggle="collapse" data-target="#createplaylistform">
          <i className="fa fa-plus"></i>
        </button>

        <div className="divider"></div>

        <button id="deletePlaylistBtn" type="submit" className="btn btn-primary raised" 
          onClick={this.handleDeletePlaylistSubmitEvent}>
          <i className="fa fa-minus"></i>
        </button>
        
        <div className="divider"></div>

        <button id="gotoPlaylistBtn" type="button" className="btn btn-primary raised" 
          onClick={this.gotoPlaylistButtonClick}><i className="fa fa-play"></i>
        </button>

        <div id="createplaylistform" className="collapse">
          <form onSubmit={this.handleCreatePlaylistSubmitEvent}>
            <input type="text" className="form-control" placeholder="Enter new playlist name" 
                  required ref="newPlaylistName" />

            <p />

            <button type="submit" className="playlist-create-btn btn btn-primary raised" 
            data-toggle="collapse" data-target="#createplaylistform">Create</button>

            <button type="reset" className="playlist-create-reset-btn btn btn-link" data-toggle="collapse" 
                data-target="#createplaylistform">Cancel</button>
          </form>
        </div>

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