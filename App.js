import React from 'react';
import { Provider } from 'react-redux';

import SearchScreen from './view/search-screen';

import store from './store';

export default class App extends React.Component {
    
    render() {
        return <Provider store={store}><SearchScreen /></Provider>;
    }
}