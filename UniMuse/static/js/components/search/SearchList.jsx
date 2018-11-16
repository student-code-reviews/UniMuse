class SearchList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};

      // Bindings
      this.getSearchListDataAllKeys = this.getSearchListDataAllKeys.bind(this);
      this.createSearchListDataElements = this.createSearchListDataElements.bind(this);
  }

  getSearchListDataAllKeys (searchListDataAll) {
    return Object.keys(searchListDataAll)
  }

  createSearchListDataElements (searchListDataAll) {
    let searchListData;

    return (
      this
      .getSearchListDataAllKeys(searchListDataAll)
      .map(function createSearchListDataElements(search_result_no) {
        searchListData = searchListDataAll[search_result_no];
        return (<SearchListElement searchListData={searchListData} />);
      }.bind(this))
    );
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
        <ul>

          {searchListDataElements.length > 0 ? searchListDataElements : <NoSearchListElement />}

        </ul>
      </div>
    );
  }
}
