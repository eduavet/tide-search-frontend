import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Result from './Result.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [[],[]],
      term: '',
      loading: false,
      notFound: false,
    }
  }

  componentDidMount() {
    const { term } = this.props.match.params
    if (term) {
      this.setState({
        term,
        homepage: false,
        loading: true
      }, this.search);
    }
  }

  search = () => {
    if (!this.state.term) return;
    this.setState({ loading: true });
    fetch(`https://tide-search-backend.herokuapp.com/search?term=${this.state.term}`)
      .then(res => res.json())
      .then((data) => {
        const notFound = data[1].length === 0 ? true : false;
        this.setState({
          results: data,
          loading: false,
          notFound
        })
      })
      .catch(console.error);
  }

  updateTerm = (e) => {
    this.setState({
      term: e.target.value,
    })
  }

  handleKeyPress= (target) => {
    if (target.charCode === 13){
      this.search();
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Wikipedia</h1>
        <h5>Look up an article!</h5>

        <div className="col-sm-4 offset-sm-4">
            <div className="input-group">
              <Input
                className="form-control mr-lg-2" type="search"
                placeholder="e.g. London" aria-label="Search" ref="searchField"
                onKeyUp={this.updateTerm} defaultValue={this.state.term}
                onKeyPress={this.handleKeyPress}
              />
            </div>
        </div>
        <Link
          to={`/${this.state.term}`}
          onClick={this.search}
        >
          <Button color="primary" id="button">
            Search
          </Button>
        </Link>

        <div id='loader'>
          <ClipLoader
          sizeUnit={"px"}
          size={50}
          color={'#007bff'}
          loading={this.state.loading}
          />
        </div>

        {this.state.notFound ? (
          <p>No results found</p>
        ) : ''}

        {this.state.results[1].map((item, index) => {
            return (
              <Result link={this.state.results[3][index]} heading={item} text={this.state.results[2][index]} key={index}/>
            );
          })
        }
      </div>
    );
  }
}

export default App;
