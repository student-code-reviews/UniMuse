let styleRequired = {
  color: "#ffaaaa"
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render () {
    let route = this.props.route
    console.log(route)

    return (
      <form action={route} method="post">
        <h3 className="page-header">Search for a Song!</h3>

        <div className="form-group">
          <label htmlFor="resultName">Search <span style={styleRequired}>*</span></label>
          <input type="text" className="form-control" name="user-song-query" placeholder="Enter song title" required ref="song-title" />
        </div>

        <div className="form-group">
          <div className="row">
            <div className="col-xs-5 col-sm-6 col-md-4">
            </div>
          </div>
        </div>

        <hr />

        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="reset" className="btn btn-link">Cancel</button>
      </form>
    );
  }
}