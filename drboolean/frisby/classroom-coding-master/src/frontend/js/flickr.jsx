const React = require('react')

module.exports = React.createClass({
  displayName: 'Flickr',

  // getInitialState :: { term :: String }
  getInitialState() { return {term: ""}},

  // termChanged :: Event -> State Term
  termChanged({currentTarget: t }) { this.setState({term: t.value}) },

  // serchClicked :: Event -> ?
  searchClicked(_) { console.log(this.state.term)  },

render() {
    return (
      <div id="flickr">
        <input onChange={this.termChanged} />
        <button onClick={this.searchClicked}>Search</button>
        <div id="results"></div>
      </div>
    );
  }
});

