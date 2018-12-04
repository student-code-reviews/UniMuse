function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}


class SearchResultsAndPlaylists extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResDataAll: [],
      userPlaylists: [],
      selectedPlaylist: {},
      playlistPlayerClick: false
    };

    // Bindings
    this.getSearchAPIrequestData = this.getSearchAPIrequestData.bind(this);
    this.saveUserNewPlaylist = this.saveUserNewPlaylist.bind(this);

    this.addUserPlaylist = this.addUserPlaylist.bind(this);
    this.removeUserPlaylist = this.removeUserPlaylist.bind(this);
    this.setSelectedPlaylist = this.setSelectedPlaylist.bind(this);
    this.deleteSelectedPlaylist = this.deleteSelectedPlaylist.bind(this);

    this.saveSongToPlaylist = this.saveSongToPlaylist.bind(this);
    this.playlistPlayerRender = this.playlistPlayerRender.bind(this);
    this.revertPlaylistPlayerRender = this.revertPlaylistPlayerRender.bind(this);
  }

  componentDidMount () {
    fetch('/user-playlists.json')
      .then(res => res.json())
      .then(data => {
        if (data === 'User does not have any playlists.') {
        } else {
          console.log(data.playlists)
          this.setState( {userPlaylists: data.playlists} );
        }
      })
    .catch(err => this.setState({ userPlaylists: "Something went wrong with user's playlists."}));
  }
  
  addUserPlaylist (playlist) {
    let updatedUserPlaylists = this.state.userPlaylists;
    updatedUserPlaylists.push(playlist);
    this.setState( {userPlaylists: updatedUserPlaylists} );
  }

  removeUserPlaylist (playlistToDelete) {
    let userPlaylists = this.state.userPlaylists;
    let updatedUserPlaylists =  userPlaylists.filter(playlist => playlist.playlist_no !== playlistToDelete);
    this.setState( {userPlaylists: updatedUserPlaylists} );
  }

  getSearchAPIrequestData (userQuery) {
    fetch(`/search-api-request.json?userquery=${userQuery}`)
      .then(res => res.json())
      .then(data => {
          this.setState({
            searchResDataAll: data
          });
        })
      .catch(err => this.setState({ searchResDataAll: "Something went wrong with API request."}));
  }

  saveUserNewPlaylist (userNewPlaylist) {
    fetch(`/save-new-playlist?newPlaylistName=${userNewPlaylist}`)
      .then(res => res.json())
      .then(response => {
        if (response === 'User already has a playlist with that name.') {
          alert(`'${userNewPlaylist}' already exists!`)
        } else {
          alert(`Successfully created playlist '${userNewPlaylist}'!`);
          this.addUserPlaylist(response);
        }
      })
      .catch(err => this.setState({ playlistsAll: "Something went wrong with saving new playlist."}));
  }

  setSelectedPlaylist (currentSelectedPlaylist) {
    this.setState({ selectedPlaylist: currentSelectedPlaylist }, () => {
      console.log(this.state.selectedPlaylist);
    });
  }

  deleteSelectedPlaylist () {
    let currentSelectedPlaylist = this.state.selectedPlaylist;

    if (isEmpty(currentSelectedPlaylist)) {
      alert("Please select a playlist to delete!");
    } else {
      let playlistToDelete = currentSelectedPlaylist.playlist_no
      fetch(`/delete-playlist?playlist=${playlistToDelete}`)
      .then(res => res.json())
      .then(response => {
        this.removeUserPlaylist(playlistToDelete);
        this.setState({ selectedPlaylist: {} }, () => {
          console.log(this.state.selectedPlaylist);
        });
      })
      .catch(err => console.log("Something went wrong with deleting playlist."));
    }
  }

  saveSongToPlaylist (songData) {
    let checkPlaylistExists = this.state.selectedPlaylist;
    let songURI = songData.songURI;
    let songTitle = songData.songTitle;
    let albumImgURLsm = songData.albumImgURLsm;
    let service = songData.service;
    
    if (isEmpty(checkPlaylistExists)) {
      alert('Please select a playlist!')
    } else {
      let playlistNo = checkPlaylistExists.playlist_no
      let playlistName = checkPlaylistExists.playlist_name

      fetch(`/save-song?songData=${songURI}&songTitle=${songTitle}&songImg=${albumImgURLsm}&playlist=${playlistNo}`)
      .then(res => res.json())
      .then(response => {
        if (response === 'Success.') {
          alert(`Added ${songTitle} to playlist: ${playlistName}.`)
        } else {
          alert('Could not add song to playlist.');
        }
      })
      .catch(err => console.log("Something went wrong with saving song to playlist."));
    }
  }

  playlistPlayerRender () {
    let checkPlaylistExists = this.state.selectedPlaylist;
    
    if (isEmpty(checkPlaylistExists)) {
      alert("Please select a playlist!");
    } else {
      this.setState({ playlistPlayerClick: true });
    }
  }

  revertPlaylistPlayerRender () {
    this.setState({ playlistPlayerClick: false });
  }

  render() {
    let searchResDataAll = this.state.searchResDataAll;
    let saveUserNewPlaylist = this.state.saveUserNewPlaylist;
    let userPlaylists = this.state.userPlaylists;
    let selectedPlaylist = this.state.selectedPlaylist;

    return (
      <div className="container">
        { this.state.playlistPlayerClick ? 
          <PlaylistPlayer selectedPlaylist={selectedPlaylist}
                          revertPlaylistPlayerRender={this.revertPlaylistPlayerRender} /> :

          <div className="row">
            <div className="col-sm-6">

              <SearchForm getSearchAPIrequestData={this.getSearchAPIrequestData} />

            </div>
            <div className="col-sm-6">

              <PlaylistForm saveUserNewPlaylist={this.saveUserNewPlaylist} 
                            deleteSelectedPlaylist={this.deleteSelectedPlaylist} 
                            playlistPlayerRender={this.playlistPlayerRender} />

            </div>
            <div className="col-sm-6">

              <SearchResults searchResDataAll={searchResDataAll} 
                             saveSongToPlaylist={this.saveSongToPlaylist} />

            </div>
            <div className="col-sm-6">
              
              <PlaylistsSongList userPlaylists={userPlaylists} 
                                 setSelectedPlaylist={this.setSelectedPlaylist} />

            </div>
          </div>
        }
      </div>
    );
  }
}