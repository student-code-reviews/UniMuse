class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
  
    }
  
    //Need to add event handler for add to playlist button
  
    render () {
      let result = this.props.result;

      return (
        <div className="panel panel-primary">
          <div className="panel-heading">
            {result.songTitle}
          </div>
  
          <p className="panel-body">
            {result.artistName}
            {result.albumName}
            {result.albumImgURLsm}
          </p>
  
          <div className="panel-footer">
            <form className="form-inline">
              <button type="add-to-playlist" className="btn btn-default btn-xs">Add to playlist</button>
            </form>
          </div>
        </div>
      );
    }
  }
  