class ResultsList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};

      // Bindings
      this.getRequestResults = this.getRequestResults.bind(this);
      this.getListOfResultNos = this.getListOfResultNos.bind(this);
      this.createSearchResultElements = this.createSearchResultElements.bind(this);
  }

  getRequestResults () {
    fetch(this.props.route)
      .then(res => res.json())
      .then(data => {
        for (let key of Object.keys(data)) {
          let result = {
            result_no: key,
            songTitle: data[key]['name'],
            artistName: data[key]['album']['artists'][0]['name'],
            albumName: data[key]['album']['name'],
            albumImgURLsm: data[key]['album']['images'][2]['url'],
            albumImgURLlg: data[key]['album']['images'][0]['url'],
            songURI: data[key]['uri']
          };
          
          this.props.addResults(result);
        }
      })
      .catch(err => this.setState({ allResults: "Something went wrong."}));
  }

  getListOfResultNos (results) {
    return Object.keys(results)
  }

  createSearchResultElements (results) {
    let result;

    return (
      this
      .getListOfResultNos(results)
      .map(function createSearchResultElements(resultNo) {
        result = results[result_no];
        return (<Result result={result} key={result.result_no} />);
      }.bind(this))
    );
  }

  render () {
    let results = this.props.results
    let listResultElements = this.createSearchResultElements(results);

    return (
      <div>
        <h3 className="page-header">

          <div>
              Search Results
          </div>

        </h3>
        <ul>

          {listResultElements.length > 0 ? listResultElements : <NoResults />}

        </ul>
      </div>
    );
  }
}
