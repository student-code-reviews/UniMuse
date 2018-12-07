class SearchResults extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        source: 'spotify'
      };

      this.spotifySearchResultsBtnClick = this.spotifySearchResultsBtnClick.bind(this);
      this.youtubeSearchResultsBtnClick = this.youtubeSearchResultsBtnClick.bind(this);
      this.mixcloudSearchResultsBtnClick = this.mixcloudSearchResultsBtnClick.bind(this);
      this.createSearchResDataElements = this.createSearchResDataElements.bind(this);
  }

  createSearchResDataElements (searchResDataAll) {
   let searchResDataSource;
   
    if (this.state.source == 'spotify') {
      searchResDataSource = searchResDataAll.spotify;
    } else if (this.state.source == 'youtube') {
      searchResDataSource = searchResDataAll.youtube;
    } else {
      searchResDataSource = searchResDataAll.mixcloud;
    };
    
    if (!searchResDataSource) {
      searchResDataSource = [];
    };

    return (
      searchResDataSource
      .map(function createSearchResDataElements(song) {
        return (<SearchResElement key={song.songURI}
                                  song={song} 
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
    this.setState({ source: 'mixcloud' });
  }

  render () {
    let searchResDataAll = this.props.searchResDataAll;
    let searchResDataElements = this.createSearchResDataElements(searchResDataAll);
    
    return (
      <div>

        <h3 className="search-results-header page-header">
          Search Results
        </h3>

        <button id="spotifySearchResultsBtn" className="btn btn-primary raised" 
          type="button" onClick={this.spotifySearchResultsBtnClick}>
          <i className="fa fa-spotify"></i>
        </button>

        <div className="divider"></div>

        <button id="youtubeSearchResultsBtn" className="btn btn-primary raised" 
          type="button" onClick={this.youtubeSearchResultsBtnClick}>
          <i className="fa fa-youtube-play"></i>
        </button>

        <div className="divider"></div>

        <button id="mixcloudSearchResultsBtn" className="btn btn-primary raised" 
          type="button" onClick={this.mixcloudSearchResultsBtnClick}>
          <i className="fa fa-mixcloud"></i>
        </button>

        <ul>
          {searchResDataElements.length > 0 ? searchResDataElements : <NoSearchResElement />}
        </ul>
        
      </div>
    );
  }
}
