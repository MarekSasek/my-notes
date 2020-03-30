import React, {Component} from "react";


class ErrorPage extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="text-center mt-5">
                <h3>Bohužel, požadovaná stránka nebyla nalezena.</h3>
            </div>
        )
    }
}


export default ErrorPage;