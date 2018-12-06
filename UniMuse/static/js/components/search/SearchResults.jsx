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
          <i className="fa fa-youtube-play"></i>&nbsp;YouTube Results
        </button>

        <button id="mixcloudSearchResultsBtn" type="button" className="btn btn-primary" 
          onClick={this.mixcloudSearchResultsBtnClick}>
          <i className="fa fa-mixcloud"></i>&nbsp;Mixcloud Results
        </button>

        <ul>
          {searchResDataElements.length > 0 ? searchResDataElements : <NoSearchResElement />}
        </ul>
        
      </div>
    );
  }
}
