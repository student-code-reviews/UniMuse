class SearchList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};

      // Bindings
      this.createSearchListDataElements = this.createSearchListDataElements.bind(this);
  }

  createSearchListDataElements (searchListDataAll) {
   console.log(searchListDataAll)

    return (
      searchListDataAll
      .map(function createSearchListDataElements(searchListData) {
        return (<SearchListElement key={searchListData.songURI}
                                   searchListData={searchListData} 
                                   saveSongToPlaylist={this.props.saveSongToPlaylist} />);
      }.bind(this))
    );
  }

  render () {
    let searchListDataAll = this.props.searchListDataAll;
    let searchListDataElements = this.createSearchListDataElements(searchListDataAll);

    return (
      <div>
        <h3 className="page-header">

          <div>
              Search Results
          </div>

        </h3>
        <ul>

          {searchListDataElements.length > 0 ? searchListDataElements : <NoSearchListElement />}

        </ul>
      </div>
    );
  }
}
