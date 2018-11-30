class SearchList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        spotify: true
      };

      // Bindings
      this.spotifySearchResultsBtnClick = this.spotifySearchResultsBtnClick.bind(this);
      this.youtubeSearchResultsBtnClick = this.youtubeSearchResultsBtnClick.bind(this);
      this.createSearchListDataElements = this.createSearchListDataElements.bind(this);
  }

  createSearchListDataElements (searchListDataAll) {
   let searchListDataAllSource;
   
    if (this.state.spotify) {
      searchListDataAllSource = searchListDataAll.spotify;
    } else {
      searchListDataAllSource = searchListDataAll.youtube;
    }
    if (!searchListDataAllSource) {
      searchListDataAllSource = [];
    }

    return (
      searchListDataAllSource
      .map(function createSearchListDataElements(searchListData) {
        return (<SearchListElement key={searchListData.songURI}
                                   searchListData={searchListData} 
                                   saveSongToPlaylist={this.props.saveSongToPlaylist} />);
      }.bind(this))
    );
  }

  spotifySearchResultsBtnClick () {
    this.setState({ spotify: true });
  }

  youtubeSearchResultsBtnClick () {
    this.setState({ spotify: false });
  }

  render () {
    let searchListDataAll = this.props.searchListDataAll
    let searchListDataElements = this.createSearchListDataElements(searchListDataAll);
    
    return (
      <div>
        <h3 className="page-header">
          <div>
              Search Results
          </div>
        </h3>

        <button id="spotifySearchResultsBtn" type="button" className="btn btn-primary" 
          onClick={this.spotifySearchResultsBtnClick}>
          <i className="fa fa-spotify"></i>&nbsp;Spotify Results
        </button>

        <button id="youtubeSearchResultsBtn" type="button" className="btn btn-primary" 
          onClick={this.youtubeSearchResultsBtnClick}>
          <i className="fa fa-youtube"></i>&nbsp;YouTube Results
        </button>

        <ul>

          {searchListDataElements.length > 0 ? searchListDataElements : <NoSearchListElement />}

        </ul>
      </div>
    );
  }
}
