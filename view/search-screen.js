import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { getCurrentWeatherByCity } from '../action/index';
import WeatherCard  from '../components/weather-card';

const MAP_STYLE = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
const DEFAULT_COORD = {
    lat: 48.859268,
    lng: 2.347060

}

class SearchScreen extends React.Component {
    
    state = {
        search: ''
    };

    updateSearch = search => {
        this.setState({search})
    }

    submitSearch = () => {
        this.props.getCurrentWeatherByCity(this.state.search);
    }


    render() {
        console.log(this.props.currentWeather)
        return (
            <View style={{flex: 1}}>
                <MapView 
                    style={{flex: 1}}
                    region={{
                        latitude: this.props.currentWeather ? this.props.currentWeather.coord.lat : DEFAULT_COORD.lat, 
                        longitude: this.props.currentWeather ? this.props.currentWeather.coord.lon :  DEFAULT_COORD.lng, 
                        latitudeDelta: 0.2000, 
                        longitudeDelta: 0.1000
                    }}
                    scrollEnable={false}
                    liteMode={true}
                    customMapStyle={MAP_STYLE}
                />
                {   
                    this.props.currentWeather && 
                    <WeatherCard currentWeather={this.props.currentWeather} />
                }
                
                <SearchBar
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    onSubmitEditing={this.submitSearch}
                    placeholder='Find your city...'
                    containerStyle={{
                        position: 'absolute',
                        top: hp('10%'),
                        left: wp('5%'),
                        width: wp('90%'),
                        backgroundColor:'transparent',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    }}
                    inputContainerStyle={{ backgroundColor: 'white' }}
                    inputStyle={{color: '#ff3d00'}}
                    placeholderTextColor={'#a1887f'}
                >
                    
                </SearchBar>
            </View>
        );
    }
}

const mapStoreToProps = (store) => {

    return {
        currentWeather: store.weather.currentWeather
    }

};

const mapDispatchToProps = {
    getCurrentWeatherByCity
};

export default connect(mapStoreToProps, mapDispatchToProps)(SearchScreen);