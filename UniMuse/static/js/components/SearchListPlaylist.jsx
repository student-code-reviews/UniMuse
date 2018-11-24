class SearchListPlaylist extends React.Component {
  constructor() {
    super();

    this.state = {
      searchListDataAll: {},
      playlistsDataAll: {}
    };

    // Bindings
    this.updateSearchListDataAll = this.updateSearchListDataAll.bind(this);
    this.addSearchListDataAll = this.addSearchListDataAll.bind(this);
    this.getAPIrequestData = this.getAPIrequestData.bind(this);
    this.saveUserNewPlaylist = this.saveUserNewPlaylist.bind(this);

    this.addPlaylistsDataAll = this.addPlaylistsDataAll.bind(this);
    this.updatePlaylistsDataAll = this.updatePlaylistsDataAll.bind(this);
  }

  componentDidMount () {
    fetch('/user-playlists.json')
      .then(res => res.json())
      .then(data => {
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
      .catch(err => this.setState({ searchListDataAll: "Something went wrong."}));
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
      .catch(err => this.setState({ playlistsAll: "Something went wrong."}));
  }

  render() {
    let searchListDataAll = this.state.searchListDataAll;
    let saveUserNewPlaylist = this.state.saveUserNewPlaylist;
    let playlistsDataAll = this.state.playlistsDataAll;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            <SearchForm getAPIrequestData={this.getAPIrequestData} />

          </div>
          <div className="col-sm-6">

            <PlaylistForm saveUserNewPlaylist={this.saveUserNewPlaylist} />

          </div>
          <div className="col-sm-6">

            <SearchList searchListDataAll={searchListDataAll} />

          </div>
          <div className="col-sm-6">
            
            <PlaylistsSongList playlistsDataAll={playlistsDataAll} />

          </div>
        </div>
      </div>
    );
  }
}