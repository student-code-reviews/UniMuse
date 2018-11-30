function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}


class SearchListPlaylist extends React.Component {
  constructor() {
    super();

    this.state = {
      searchListDataAll: [],
      playlistsDataAll: [],
      selectedPlaylist: {},
      playlistPlayerClick: false
    };

    // Bindings
    this.getSpotifyAPIrequestData = this.getSpotifyAPIrequestData.bind(this);
    this.saveUserNewPlaylist = this.saveUserNewPlaylist.bind(this);

    this.addPlaylistsDataAll = this.addPlaylistsDataAll.bind(this);
    this.removePlaylistData = this.removePlaylistData.bind(this);
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
          this.setState( {playlistsDataAll: data.playlists} );
        }
      })
    .catch(err => this.setState({ playlistsDataAll: "Something went wrong with user's playlists."}));
  }
  
  addPlaylistsDataAll (playlistData) {
    let newPlaylistsDataAll = this.state.playlistsDataAll;
    newPlaylistsDataAll.push(playlistData);
    this.setState( {playlistsDataAll: newPlaylistsDataAll} );
  }

  removePlaylistData (playlistToDelete) {
    let playlistDataAll = this.state.playlistsDataAll;
    let newPlaylistsDataAll =  playlistDataAll.filter(playlist => playlist.playlist_no !== playlistToDelete);
    this.setState( {playlistsDataAll: newPlaylistsDataAll} );
  }

  getSpotifyAPIrequestData (userQuery) {
    fetch(`/spotify-search-api-request.json?userquery=${userQuery}`)
      .then(res => res.json())
      .then(data => {
          this.setState({
            searchListDataAll: data
          });
        })
      .catch(err => this.setState({ searchListDataAll: "Something went wrong with API request."}));
  }

  saveUserNewPlaylist (userNewPlaylist) {
    fetch(`/save-new-playlist?newPlaylistName=${userNewPlaylist}`)
      .then(res => res.json())
      .then(response => {
        if (response === 'User already has a playlist with that name.') {
          alert(`'${userNewPlaylist}' already exists!`)
        } else {
          alert(`Successfully created playlist '${userNewPlaylist}'!`);
          this.addPlaylistsDataAll(response);
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
        this.removePlaylistData(playlistToDelete);
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
    let artistName = songData.artistName;
    let albumImgURLsm = songData.albumImgURLsm;
    
    console.log(checkPlaylistExists);
    console.log(songURI);
    
    if (isEmpty(checkPlaylistExists)) {
      alert('Please select a playlist!')
    } else {
      let playlistNo = checkPlaylistExists.playlist_no
      let playlistName = checkPlaylistExists.playlist_name

      fetch(`/save-song?songData=${songURI}&songTitle=${songTitle}&artistName=${artistName}&songImg=${albumImgURLsm}&playlist=${playlistNo}`)
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
    let searchListDataAll = this.state.searchListDataAll;
    let saveUserNewPlaylist = this.state.saveUserNewPlaylist;
    let playlistsDataAll = this.state.playlistsDataAll;
    let selectedPlaylist = this.state.selectedPlaylist;

    return (
      <div className="container">
        { this.state.playlistPlayerClick ? 
          <PlaylistPlayer selectedPlaylist={selectedPlaylist}
                          revertPlaylistPlayerRender={this.revertPlaylistPlayerRender} /> :

          <div className="row">
            <div className="col-sm-6">

              <SearchForm getSpotifyAPIrequestData={this.getSpotifyAPIrequestData} />

            </div>
            <div className="col-sm-6">

              <PlaylistForm saveUserNewPlaylist={this.saveUserNewPlaylist} 
                            deleteSelectedPlaylist={this.deleteSelectedPlaylist} 
                            playlistPlayerRender={this.playlistPlayerRender} />

            </div>
            <div className="col-sm-6">

              <SearchList searchListDataAll={searchListDataAll} 
                          saveSongToPlaylist={this.saveSongToPlaylist} />

            </div>
            <div className="col-sm-6">
              
              <PlaylistsSongList playlistsDataAll={playlistsDataAll} 
                                setSelectedPlaylist={this.setSelectedPlaylist} />

            </div>
          </div>
        }
      </div>
    );
  }
}