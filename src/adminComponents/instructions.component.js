import React, {Component} from 'react';

class InstructionsComponent extends Component {
    render() {
        return (
            <div>
                <div >
                    <img
                        height="100%"
                        width="100%"
                        src={`/admin1.jpg`}
                    />
                    <br/>
                    <img
                        height="100%"
                        width="100%"
                        src={`/admin2.jpg`}
                    />
                    <br/>
                    <img
                        height="100%"
                        width="100%"
                        src={`/local1.jpg`}
                    />
                    <br/>
                    <img
                        height="100%"
                        width="100%"
                        src={`/local2.jpg`}
                    />
                </div>
            </div>
        );
    }
}

export default InstructionsComponent;