let styleRequired = {color: "#ffaaaa"};


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearchSubmitEvent = this.handleSearchSubmitEvent.bind(this);
  }

  handleSearchSubmitEvent (evt) {
    evt.preventDefault();

    let userQuery = this.refs.userquery.value;
    this.props.getSearchAPIrequestData(userQuery);
  }

  render () {

    return (
      <form onSubmit={this.handleSearchSubmitEvent}>

        <h3 className="search-form-header page-header">
          <strong>Search for a Song!</strong>
        </h3>

        <div className="search-form-box form-group">
          <label htmlFor="searchBoxLabel">
            Search <span style={styleRequired}>*</span>
          </label>
          <input type="text" className="form-control" placeholder="Enter song title" 
          required ref="userquery" />
        </div>

        <button type="submit" className="search-form-btn btn btn-primary raised">Submit</button>
        <button type="reset" className="search-form-reset-btn btn btn-link">Cancel</button>

        <div className="form-group">
          <div className="row">
            <div className="col-xs-5 col-sm-6 col-md-4">
            </div>
          </div>
        </div>

        <hr />
        
      </form>
    );
  }
}