import store from "./js/Store.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("Tood :Handle Submit : ", this.state.searchKeyword);
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    this.setState({ searchResult, submitted: true });
  }

  handleReset() {
    this.setState(
      () => {
        return { searchKeyword: "" };
      },
      () => {
        console.log("TODO : handleReset ", this.state.searchKeyword);
      }
    );
  }
  handleChangeInput(event) {
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate();
    if (event.target.value.length <= 0) {
      return this.handleReset();
    }
    this.setState({
      searchKeyword: event.target.value,
    });
  }

  render() {
    let resetButton = null;

    if (this.state.searchKeyword.length > 0) {
      resetButton = <button type="reset" className="btn-reset"></button>;
    }

    const searchForm = (
      <form
        onSubmit={(event) => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={this.state.searchKeyword}
          onChange={(event) => this.handleChangeInput(event)}
        />
        {resetButton}
      </form>
    );

    const SearchResult = () => (
      <>
        {this.state.submitted && (
          <div className="content">
            {this.state.searchResult.length > 0 ? (
              <ul className="result">
                {this.state.searchResult.map((item) => {
                  return (
                    <li key={item.id}>
                      <img src={item.imageUrl} alt={item.name} />
                      <p>{item.name}</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="empty-box">검색 결과가 없습니다.</div>
            )}
          </div>
        )}
      </>
    );

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>

        {searchForm}

        <div className="container">
          <SearchResult />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
