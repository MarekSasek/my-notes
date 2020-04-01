import React, {Component} from "react";
import Translate from "react-translate-component";


class ErrorPage extends Component {


    render() {
        return (
            <div className="text-center mt-5">
                <Translate content="pageNotFound" component="h3" />
            </div>
        )
    }
}


export default ErrorPage;