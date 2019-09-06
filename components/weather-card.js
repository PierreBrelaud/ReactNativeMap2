import React, { Component } from 'react';
import { Animated, View, Text, PanResponder, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { kelvinToCelcius } from '../service/temperature';
import { Button, Icon } from 'react-native-elements';

const CARD_INITIAL_POSITION_Y = hp('80%');
const CARD_INITIAL_POSITION_X = wp('5%');

const CARD_OPEN_POSITION = hp('25%');

const MAX_DRAG_ZONE_WHEN_OPEN = hp('45%');

const TRESHOLD_TO_TOP = hp('75%');
const TRESHOLD_TO_BOTTOM = hp('70%');

const ICON_URL = 'http://openweathermap.org/img/w/';

class WeatherCard extends Component {

    state = { panResponder: undefined, isOpen: false }

    componentDidMount() {
        this.position = new Animated.ValueXY();
        this.position.setValue({
            x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y
        })
        panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                if(!this.state.isOpen && gesture.y0 > MAX_DRAG_ZONE_WHEN_OPEN) {
                    this.position.setValue({
                        x: CARD_INITIAL_POSITION_X, y: gesture.moveY
                    });
                }
            },
            onPanResponderRelease: (event, gesture) => {
                if(!this.state.isOpen) {
                    if(gesture.moveY <= TRESHOLD_TO_TOP) {
                        this.setOpenPosition(() => this.setState({isOpen: true}));
                    }
                    else {
                        this.resetPosition();
                    }
                }
                else {
                    if(gesture.moveY <= TRESHOLD_TO_BOTTOM) {
                        this.setOpenPosition();
                    }
                    else {
                        if(gesture.y0 < MAX_DRAG_ZONE_WHEN_OPEN) {
                            this.resetPosition(() => this.setState({isOpen: false}))
                        }
                    }
                }
            }
        });
        this.setState({
            panResponder
        })
    }   

    setOpenPosition = (done) => {
        Animated.spring(this.position, {
            toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_OPEN_POSITION}
        }).start(() => done && done());
    }

    resetPosition = (done) => {
        Animated.spring(this.position, {
            toValue: { x: CARD_INITIAL_POSITION_X, y: CARD_INITIAL_POSITION_Y}
        }).start(() => done && done());
    }


    getCardStyle() {
        return {
            width: wp('90%'),
            height: hp('60%'),
            borderRadius: 10,zIndex: 2,
            backgroundColor: 'white',
            elevation: 1,
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowOffset: { height: 2, width: 2 },
            position: 'absolute',
            left: CARD_INITIAL_POSITION_X,
            padding: hp('2%'),
            ...this.position.getLayout()
        }
    }

    renderHeader() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', minHeight: hp('20%'), marginBottom: 20}}>
                <Text style={{fontSize: 30, marginTop: hp('1%')}}>
                    {this.props.currentWeather.name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{marginTop: hp('1%'), fontSize: 30}}>
                        {kelvinToCelcius(this.props.currentWeather.main.temp) + '°C'}
                    </Text>
                    <Image 
                        source={{uri: `${ICON_URL}${this.props.currentWeather.weather[0].icon}.png`}}
                        style={{height: 60, width: 60}} />
                </View>
            </View>
        );
    }

    renderMoreDetail() {
        return (
            <View 
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View style={{alignItems: 'center'}}>
                    <Text>Humidity: {this.props.currentWeather.main.humidity}</Text>
                    <Text>Pressure: {this.props.currentWeather.main.pressure}</Text>
                    <Text>Max temperature: {kelvinToCelcius(this.props.currentWeather.main.temp_max)}</Text>
                    <Text>Min temperature: {kelvinToCelcius(this.props.currentWeather.main.temp_min)}</Text>
                    <Text>Wind Speed: {this.props.currentWeather.wind.speed} Km/h</Text>
                </View>
                <Button 
                    icon={
                        <Icon
                            name='ios-arrow-forward'
                            type='ionicon'
                            color="white"
                            size={18}
                            iconStyle={{
                                marginLeft: 10,
                                paddingTop: 3
                            }}
                        />
                    }
                    iconRight
                    containerStyle={{
                        marginTop: hp('3%'),
                        width: wp('60%')
                    }}
                    buttonStyle={{
                        backgroundColor: '#ff3d00'
                    }}
                    title="See 5 days forecast"
                    onPress={() => console.log('press')}
                />
            </View>
        );
    }

    render() {
        return (

            this.state.panResponder ? 
            <Animated.View
                {...this.state.panResponder.panHandlers}
                style={this.getCardStyle()}
            >
                { this.renderHeader() }   
                { this.state.isOpen && this.renderMoreDetail() }   
            </Animated.View>  :
            <View />
        );
    }

}

export default WeatherCard;