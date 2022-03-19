import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StyledForm from './StyledForm';

const words = ['toast', 'root', 'onion', 'guitar', 'surf', 'skate', 'laugh', 'calm', 'apple', 'sunset', 
                'opal', 'garden', 'gopher', 'rare', 'ruby', 'treat', 'tasty', 'cool', 'cost', 'oven'];

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <div className='root'>
                <h1><b>Hang Man :)-{'>'}-{'<'}</b></h1>
                <StyledForm words={words} />
            </div>
            </>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

