class SearchListElement extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};

  }

  render () {
    let searchListData = this.props.searchListData;

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          {searchListData.songTitle}
        </div>

        <p className="panel-body">
          <img src={searchListData.albumImgURLsm}></img>
          <strong>Artist:</strong> {searchListData.artistName}
          <strong> Album:</strong> {searchListData.albumName}
        </p>

        <div className="panel-footer">
          <form className="form-inline">
            <button type="button" className="btn btn-default btn-xs">Add to playlist</button>
            <button type="button" className="btn btn-default btn-xs">Play Song</button>
          </form>
        </div>
      </div>
    );
  }
}
