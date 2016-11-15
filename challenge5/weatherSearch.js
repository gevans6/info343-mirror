class WeatherSearch extends React.Component {
    render () {
        return (
            <div className="container">
                <form onSubmit={(e) => this.wSearch(e)}>
                    <input type="text" ref="query"/>
                    <button type="submit" className="btn btn-primary">Search</button>

                    <div className={"alert alert-danger " + (this.props.alert.active ? "active" : "") }>
                        {this.props.alert.message}
                    </div>
                </form>

                
            </div>
        )

       
    }

    wSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        this.props.onSearch(queryValue);
    }
}