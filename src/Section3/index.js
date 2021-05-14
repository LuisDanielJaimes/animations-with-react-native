/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   View,
   Animated,
   TouchableWithoutFeedback,
   Text,
   Button,
   Easing,
   ScrollView,
   Dimensions,
   TouchableOpacity,
   PanResponder
} from 'react-native';

import clamp from 'clamp';

const SWIPE_THRESHOLD = 129;
const { height } = Dimensions.get("window");

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animation: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
            nextCard: new Animated.Value(.8),
            items: [{
                img: "https://images.pexels.com/photos/5738120/pexels-photo-5738120.jpeg",
                id: 1,
                text:"Primero"
                },
                {
                img: "https://images.pexels.com/photos/7623803/pexels-photo-7623803.jpeg",
                id: 2,
                text:"Segundo"
                },
                {
                img: "https://images.pexels.com/photos/7689090/pexels-photo-7689090.jpeg",
                id: 3,
                text:"Tercero"
                },
                {
                img: "https://images.pexels.com/photos/3056063/pexels-photo-3056063.jpeg",
                id: 4,
                text:"Cuarto"
                }
            ]
        };

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state.animation.x,
                    dy: this.state.animation.y
                }
            ]),
            onPanResponderRelease: (e, { dx, vx, vy }) => { 
                let velocity;

                if(vx >= 0){
                    velocity = clamp(vx, 3, 5);
                } else if (vx < 0) {
                    velocity = clamp(Math.abs(vx), 3, 5) * -1;
                }

                if(Math.abs(dx) > SWIPE_THRESHOLD) {
                    Animated.decay(this.state.animation, {
                        velocity: { x: velocity, y: vy },
                        deceleration:  .98,
                        useNativeDriver: true
                    }).start(this.transitionNext);
                } else {
                    Animated.spring(this.state.animation, {
                        toValue: { x: 0, y:0},
                        friction: 4,
                        useNativeDriver: true
                    }).start();
                }
            
            },
        })
    }

    componentDidMount() {

    }

    transitionNext = () => {

        Animated.parallel([
            Animated.timing(this.state.opacity,{
                toValue:0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.spring(this.state.nextCard, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            })
        ]).start(()=> {
            this.setState((state) => {
                return {
                    items: state.items.slice(1)
                }
            }, () => {
                this.state.nextCard.setValue(.8);
                this.state.opacity.setValue(1);
                this.state.animation.setValue({x:0,y:0})
            })
        
        })
    }


    handleNo = () => {
        Animated.timing(this.state.animation.x, {
            toValue: -SWIPE_THRESHOLD,
            useNativeDriver: true,
        }).start(this.transitionNext)
    }

    handleYes = () => {
        Animated.timing(this.state.animation.x, {
            toValue: SWIPE_THRESHOLD,
            useNativeDriver: true,
        }).start(this.transitionNext)

    }

    render() {

        const { animation } = this.state;

        const rotate = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ["-30deg", "0deg", "30deg"],
            extrapolate: "clamp",
        })

        const opacity = animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [.5, 1 , .5],
            extrapolate:"clamp"
        })

        const animatedCardStyles = {
            opacity: this.state.opacity,
            transform: [
                {
                    rotate
                },
                ...this.state.animation.getTranslateTransform()
            ]
        }

        const animatedImagesStyle = {
            opacity
        }


    const yesOpacity = animation.x.interpolate({ inputRange: [0, 150], outputRange: [0, 1] });
    const yesScale = animation.x.interpolate({
      inputRange: [0, 150],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    });
    const animatedYupStyles = {
      transform: [{ scale: yesScale }, { rotate: "-30deg" }],
      opacity: yesOpacity,
    };

    const noOpacity = animation.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0] });
    const noScale = animation.x.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    const animatedNopeStyles = {
      transform: [{ scale: noScale }, { rotate: "30deg" }],
      opacity: noOpacity,
    };

        return (
            <View style={[styles.container]}>
                <View style={[styles.top]}>
                    {
                        this.state.items.slice(0,2).reverse().map(({img,id,text}, index, items) =>{

                            const isLastItem = index === items.length - 1;
                            const IsSecondLast = index === items.length - 2;

                            const panHandelrs = isLastItem ? this._panResponder.panHandlers:{};
                            const cardSstyle = isLastItem ? animatedCardStyles:undefined;
                            const imageStyle = isLastItem ? animatedImagesStyle:undefined;

                            const nexStyle = IsSecondLast ? { transform: [{ scale:this.state.nextCard}] } : undefined;

                            return (
                                <Animated.View 
                                style={[styles.card, cardSstyle, nexStyle]}
                                {...panHandelrs}
                                key={id}>
                                    <Animated.Image
                                    source={{uri: img}}
                                    resizeMode="cover"
                                    style={[styles.image, imageStyle]}
                                    />
                                    <View style={[styles.lowertext]}>
                                        <Text>{text}</Text>
                                    </View>

                                    {isLastItem &&
                                    <Animated.View style={[styles.nope, animatedNopeStyles]}>
                                        <Text style={styles.nopeText}>Nope!</Text>
                                    </Animated.View>}

                                    {isLastItem &&
                                    <Animated.View style={[styles.yup, animatedYupStyles]}>
                                        <Text style={styles.yupText}>Yup!</Text>
                                    </Animated.View>}
                                </Animated.View>
                            )
                        })
                    }
                </View>
                <View style={[styles.buttonBar]}>
                    <TouchableOpacity onPress={this.handleNo}
                    style={[styles.button, styles.nopeButton]} >
                        <Text style={styles.nopeText}> No </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleYes}
                    style={[styles.button, styles.yupButton]} >
                    <Text style={styles.yupText}> Yes </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    card: {
        width: 300,
        height: 300,
        position: "absolute",
        borderRadius: 3,
        shadowColor: "#000",
        shadowOpacity: .1,
        shadowOffset: { x: 0, y: 0},
        shadowRadius: 5,
        borderWidth: 1,
        borderColor:"#FFF"
    },
    image: {
        width: null,
        height: null,
        flex: 3,
        borderRadius:2
    },
    lowertext: {
        flex: 1,
        backgroundColor:"#FFF",
        padding: 5
    },
    button: {
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.3,
        shadowOffset: {x: 0, y: 0},
        shadowRadius: 5,
        elevation: 2,
    },
    yupButton: {
        shadowColor: "green",
    },
    nopeButton: {
        shadowColor: "red"
    },
    lowerText: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 5,
      },
      yup: {
        borderColor: "green",
        borderWidth: 2,
        position: "absolute",
        padding: 20,
        borderRadius: 5,
        top: 20,
        left: 20,
        backgroundColor: "#FFF",
      },
      yupText: {
        fontSize: 16,
        color: "green",
      },
      nope: {
        borderColor: "red",
        borderWidth: 2,
        position: "absolute",
        padding: 20,
        borderRadius: 5,
        right: 20,
        top: 20,
        backgroundColor: "#FFF",
      },
      nopeText: {
        fontSize: 16,
        color: "red",
      },
})