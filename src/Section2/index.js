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
   ScrollView
} from 'react-native';
 
export default class Home extends Component {
    state = {
        animation: new Animated.Value(0),
        animationColor: new Animated.Value(0),
    }

    startAnimation = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animation, {
                toValue: 2,
                duration: 350,
                useNativeDriver: false
            }).start();
        });
    }

    startAnimationColor = () => {
        Animated.timing(this.state.animationColor, {
            toValue: 3,
            duration: 1500,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animationColor, {
                toValue: 0,
                duration: 1350,
                useNativeDriver: false
            }).start();
        });
    }

    render() {

        const colorInterpolate = 
        this.state.animationColor.interpolate({
            inputRange: [0,1,2,3],
            outputRange: ["tomato", "rgb(255,99,71)","rgb(99,71,255)", "rgb(71,255,99)"]
        });

        const animatedInterpolate = 
        this.state.animation.interpolate({
            inputRange: [0,1,2],
            outputRange: [0, 300, 0]
        });

        const interpolatedInterpolate = 
        animatedInterpolate.interpolate({
            inputRange: [0, 50, 100, 150, 200, 250, 300],
            outputRange: [1,0,1,0,1,0,1]
        })

        const interpolatedXInterpolate = 
        animatedInterpolate.interpolate({
            inputRange: [0, 50, 100, 150, 200, 250, 300],
            outputRange: [0,-50,100,-10,-111,50,100]
        })

        
        const animatedStales = {
            transform: [
                {
                    translateY: animatedInterpolate
                },
                {
                    translateX: interpolatedXInterpolate
                }
            ],
            opacity: interpolatedInterpolate,
            backgroundColor: colorInterpolate
        }

        const backgroundContainer = {
            backgroundColor: this.state.animationColor.interpolate({
                inputRange: [0,1,2,3],
                outputRange: ["white", "black","white","black"]
            })
        }


        return (
            <Animated.View style={[styles.container, backgroundContainer]}>
                <Animated.View style={[styles.containerAInner]}>
                    <Text>Interpolation</Text>
                    <Animated.View style={[styles.box, animatedStales]}>
                </Animated.View>
                </Animated.View>
                <View style={styles.containerB}>
                    <View style={styles.buttonS}>
                      <Button
                            title="Translate Y and X"
                            onPress={this.startAnimation}
                            color="#2EC4B6"
                        />
                    </View>
                    <View style={styles.buttonS}>
                      <Button
                            title="Color"
                            onPress={this.startAnimationColor}
                            color="#2EC4B6"
                        />
                    </View>

                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerA: {
        flex: 4,
        // alignItems: "center",
        // justifyContent: "center",
    },
    containerAInner:{
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    containerB: {
        flex: 1,
        alignItems: "center",
        paddingTop:10,
        flexDirection: "row",
        backgroundColor:"#ffdfb4",
        flexWrap:"wrap",
        opacity: 0.9
        
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: "tomato",
        marginTop:10
    },
    buttonS: {
        marginTop:5,
        marginLeft:5,
        backgroundColor:"#CBF3F0"
    }
})