class SearchList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        source: 'spotify'
      };

      // Bindings
      this.spotifySearchResultsBtnClick = this.spotifySearchResultsBtnClick.bind(this);
      this.youtubeSearchResultsBtnClick = this.youtubeSearchResultsBtnClick.bind(this);
      this.mixcloudSearchResultsBtnClick = this.mixcloudSearchResultsBtnClick.bind(this);
      this.createSearchListDataElements = this.createSearchListDataElements.bind(this);
  }

  createSearchListDataElements (searchListDataAll) {
   let searchListDataAllSource;
   
    if (this.state.source == 'spotify') {
      searchListDataAllSource = searchListDataAll.spotify;
    } else if (this.state.source == 'youtube') {
      searchListDataAllSource = searchListDataAll.youtube;
    } else {
      searchListDataAllSource = searchListDataAll.mixcloud;
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
    this.setState({ source: 'spotify' });
  }

  youtubeSearchResultsBtnClick () {
    this.setState({ source: 'youtube' });
  }

  mixcloudSearchResultsBtnClick () {
    this.setState({ source: 'mixcloud' })
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

        <button id="mixcloudSearchResultsBtn" type="button" className="btn btn-primary" 
          onClick={this.mixcloudSearchResultsBtnClick}>
          <i className="fa fa-mixcloud"></i>&nbsp;Mixcloud Results
        </button>

        <ul>

          {searchListDataElements.length > 0 ? searchListDataElements : <NoSearchListElement />}

        </ul>
      </div>
    );
  }
}
