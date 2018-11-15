class SearchResultsList extends React.Component {
  constructor() {
    super();

    // Initial state (attributes of SearchResultsList class)
    this.state = {
      allResults: {}
    };

    this.updateResults = this.updateResults.bind(this);  // What does binding do?
    this.addResults = this.addResults.bind(this);
    this.getAPIrequestData = this.getAPIrequestData.bind(this);
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

  // Put it in here for now (one top of tree instead of two) - refactor later
  getAPIrequestData (userQuery) {
    fetch(`/search-results.json?userquery=${userQuery}`)
      .then(res => res.json())
      .then(data => {
        for (let key of Object.keys(data)) {
          console.log(key, data[key])
          let result = {
            result_no: key,
            songTitle: data[key]['name'],
            artistName: data[key]['album']['artists'][0]['name'],
            albumName: data[key]['album']['name'],
            albumImgURLsm: data[key]['album']['images'][2]['url'],
            albumImgURLlg: data[key]['album']['images'][0]['url'],
            songURI: data[key]['uri']
          };
          console.log(result)
          this.addResults(result);
        }
      })
      .catch(err => this.setState({ allResults: "Something went wrong."}));
  }

  render() {
    let results = this.state.allResults;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            <SearchForm getAPIrequestData={this.getAPIrequestData} />

          </div>
          <div className="col-sm-6">

            <ResultsList results={results} />

          </div>
        </div>
      </div>
    );
  }
}