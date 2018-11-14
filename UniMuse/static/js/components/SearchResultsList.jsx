class SearchResultsList extends React.Component {
  constructor() {
    super();

    // Initial state (attributes of SearchResultsList class)
    this.state = {
      allResults: {},
      route: "/search-results.json"
    };

    this.updateResults = this.updateResults.bind(this);
    this.addResults = this.addResults.bind(this);
  }

  updateResults (newResults) {
    this.setState({
      allResults: newResults
    });
  }
  
  addResults (result) {
    let allResults = this.state.allResults;

    allResults[result.result_no] = result;

    this.updateResults(allResults)
  }

  render() {
    let results = this.state.allResults;
    let route = this.state.route;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            <SearchForm 
              route={route} />

          </div>
          <div className="col-sm-6">

            <ResultsList 
              addResults={this.addResults} 
              results={results} 
              route={route} />

          </div>
        </div>
      </div>
    );
  }
}