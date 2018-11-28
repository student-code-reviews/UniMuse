function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}


class SearchListPlaylist extends React.Component {
  constructor() {
    super();

    this.state = {
      searchListDataAll: {},
      playlistsDataAll: {},
      selectedPlaylist: {},
      playlistPlayerClick: false
    };

    // Bindings
    this.updateSearchListDataAll = this.updateSearchListDataAll.bind(this);
    this.addSearchListDataAll = this.addSearchListDataAll.bind(this);
    this.getAPIrequestData = this.getAPIrequestData.bind(this);
    this.saveUserNewPlaylist = this.saveUserNewPlaylist.bind(this);

    this.updatePlaylistsDataAll = this.updatePlaylistsDataAll.bind(this);
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
          let playlistsDataAll = {};
          for (let key of Object.keys(data)) {
            let playlistData = {
              playlist_no: key,
              playlist_name: data[key]
            };
            playlistsDataAll[key] = playlistData;
          };
          this.setState( {playlistsDataAll: playlistsDataAll} );
          // console.log(this.state.playlistsDataAll);
        }
      })
    .catch(err => this.setState({ playlistsDataAll: "Something went wrong with user's playlists."}));
  }

  updateSearchListDataAll (newSearchListDataAll) {
    this.setState({
      searchListDataAll: newSearchListDataAll
    });
  }

  updatePlaylistsDataAll (newPlaylistsDataAll) {
    this.setState( {playlistsDataAll: newPlaylistsDataAll} );
  }
  
  addSearchListDataAll (searchListData) {
    let searchListDataAll = this.state.searchListDataAll;

    searchListDataAll[searchListData.search_result_no] = searchListData;

    this.updateSearchListDataAll(searchListDataAll);
  }

  addPlaylistsDataAll (playlistData) {
    let playlistsDataAll = this.state.playlistsDataAll;

    playlistsDataAll[playlistData.playlist_no] = playlistData;

    this.updatePlaylistsDataAll(playlistsDataAll);
  }

  removePlaylistData (playlistData) {
    let playlistDataAll = this.state.playlistsDataAll;
    
    delete playlistDataAll[playlistData.playlist_no];

    this.updatePlaylistsDataAll(playlistDataAll);
  }

  getAPIrequestData (userQuery) {
    fetch(`/search-api-request.json?userquery=${userQuery}`)
      .then(res => res.json())
      .then(data => {
        for (let key of Object.keys(data)) {
          // console.log(key, data[key])
          let searchListData = {
            search_result_no: key,
            songTitle: data[key]['name'],
            artistName: data[key]['album']['artists'][0]['name'],
            albumName: data[key]['album']['name'],
            albumImgURLsm: data[key]['album']['images'][2]['url'],
            albumImgURLlg: data[key]['album']['images'][0]['url'],
            songURI: data[key]['uri']
          };
          // console.log(searchListData)
          this.addSearchListDataAll(searchListData);
        }
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

    // By nature, the if statement should only require playlists that exist in the DB.
    if (isEmpty(currentSelectedPlaylist)) {
      alert("Please select a playlist to delete!");
    } else {
      let playlistToDelete = currentSelectedPlaylist.playlist_no
      // console.log(playlistToDelete)
      fetch(`/delete-playlist?playlist=${playlistToDelete}`)
      .then(res => res.json())
      .then(response => {
        this.removePlaylistData(currentSelectedPlaylist);
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

              <SearchForm getAPIrequestData={this.getAPIrequestData} />

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