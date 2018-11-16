class SearchListPlaylist extends React.Component {
  constructor() {
    super();

    this.state = {
      searchListDataAll: {},
      playlistsAll: {}
    };

    // Bindings
    this.updateSearchListDataAll = this.updateSearchListDataAll.bind(this);
    this.addSearchListDataAll = this.addSearchListDataAll.bind(this);
    this.getAPIrequestData = this.getAPIrequestData.bind(this);
    this.saveUserNewPlaylist = this.saveUserNewPlaylist.bind(this);
  }

  updateSearchListDataAll (newSearchListDataAll) {
    this.setState({
      searchListDataAll: newSearchListDataAll
    });
  }
  
  addSearchListDataAll (searchListData) {
    let searchListDataAll = this.state.searchListDataAll;

    searchListDataAll[searchListData.search_result_no] = searchListData;

    this.updateSearchListDataAll(searchListDataAll)
  }

  getAPIrequestData (userQuery) {
    fetch(`/search-api-request.json?userquery=${userQuery}`)
      .then(res => res.json())
      .then(data => {
        for (let key of Object.keys(data)) {
          console.log(key, data[key])
          let searchListData = {
            search_result_no: key,
            songTitle: data[key]['name'],
            artistName: data[key]['album']['artists'][0]['name'],
            albumName: data[key]['album']['name'],
            albumImgURLsm: data[key]['album']['images'][2]['url'],
            albumImgURLlg: data[key]['album']['images'][0]['url'],
            songURI: data[key]['uri']
          };
          console.log(searchListData)
          this.addSearchListDataAll(searchListData);
        }
      })
      .catch(err => this.setState({ searchListDataAll: "Something went wrong."}));
  }

  saveUserNewPlaylist (userNewPlaylist) {
    fetch(`/save-new-playlist?newPlaylistName=${userNewPlaylist}`)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (response === 'Sucessfully added the playlist.') {
          alert(`Successfully created playlist '${userNewPlaylist}'!`);
        } else {
          alert(`'${userNewPlaylist}' already exists!`)
        }

      })
      .catch(err => this.setState({ playlistsAll: "Something went wrong."}));
  }

  render() {
    let searchListDataAll = this.state.searchListDataAll;
    let saveUserNewPlaylist = this.state.saveUserNewPlaylist;

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
        </div>
      </div>
    );
  }
}