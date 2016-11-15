class WeatherSaved extends React.Component {
    render() {
        return (
            <div className="container">
                        <ul className="list-group">
                            {
                                this.props.saved.map((location) => (
                                    <li className="list-group-item" key={location}>
                                        <a href="#" onClick={(e) => this.onSavedClick(e, location)}>
                                            {location}
                                        </a>
                                        <span className="pull-right">
                                        <button className="btn btn-link" onClick={(e) => this.onRemoveClick(e, location)}>Remove</button>
                                        </span>
                                    </li>
                                ))

                                
                            }
                        </ul>
            </div>
        )
    }

    onSavedClick(e, location) {
        e.preventDefault();

        this.props.onClick(location);
    }

    onRemoveClick(e, location) {
        e.preventDefault();
        
        this.props.onRemove(location);
    }
}