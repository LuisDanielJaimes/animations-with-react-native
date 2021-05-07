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
        animation: new Animated.Value(1),
        animationT: new Animated.Value(0),
        animationS: new Animated.Value(1),
        animationWidth: new Animated.Value(150),
        animationHeight: new Animated.Value(150),
        animationColor: new Animated.Value(0),
        animationRotate: new Animated.Value(0),
        animationBackScroll: new Animated.Value(0),

    }

    startAnimation = () => {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 350,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animation, {
                toValue: 1,
                duration: 350,
                useNativeDriver: false
            }).start();
        });
    }

    startAnimationT = () => {
        Animated.timing(this.state.animationT, {
            toValue: 100,
            duration: 1500,
            useNativeDriver: false,
            easing: Easing.bounce
        }).start(()=>{
            Animated.timing(this.state.animationT, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: false,
            easing: Easing.bounce
            }).start();
        });
    }

    startAnimationS = () => {
        Animated.timing(this.state.animationS, {
            toValue: 2,
            duration: 1500,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animationS, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false
            }).start();
        });
    }

    startAnimationWidth = () => {
        Animated.timing(this.state.animationWidth, {
            toValue: 300,
            duration: 1500,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animationWidth, {
                toValue: 150,
                duration: 1500,
                useNativeDriver: false
            }).start();
        });
    }

    startAnimationHeight = () => {
        Animated.timing(this.state.animationHeight, {
            toValue: 300,
            duration: 1500,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animationHeight, {
                toValue: 150,
                duration: 1500,
                useNativeDriver: false
            }).start();
        });

    }

    startAnimationColor = () => {
        Animated.timing(this.state.animationColor,{
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animationColor, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }).start();
        });

    }
    startAnimationRotate=()=>{
        Animated.timing(this.state.animationRotate, {
            toValue:360,
            duration:1000,
            useNativeDriver: false
        }).start(()=>{
            Animated.timing(this.state.animationRotate, {
                toValue:0,
                duration:1000,
                useNativeDriver: false
            }).start();
        })

    }
    startAnimationTranslateWithSpring = () => {
        Animated.spring(this.state.animationT, {
            toValue: 100,
            friction: 5,
            tension: 140,
            useNativeDriver: false,
        }).start(()=>{
            Animated.spring(this.state.animationT, {
                toValue: 0,
                useNativeDriver: false,
            }).start();
        });
    }
    render() {
        const rotateInterpolation = 
        this.state.animationRotate.interpolate({
            inputRange: [0,360],
            outputRange: ["0deg","360deg"],
        })

        const backInterpolation = 
        this.state.animationColor.interpolate({
            inputRange: [0,1],
            outputRange: ["rgb(255, 191, 105)","rgb(203, 59, 17)"],
        })

        const coloInterpolation =
        this.state.animationColor.interpolate({
            inputRange: [0,1],
            outputRange: ["rgb(203, 59, 17)","rgb(255, 191, 105)"]
        })

        const backScrollInterpolation =
        this.state.animationBackScroll.interpolate({
            inputRange: [0,300],
            outputRange: ["rgb(0, 196, 154)","rgb(255, 194, 180)"]
        })

        const colTextAnimatedStyle = {
            color: coloInterpolation
        }
    
        
        const animatedStales = {
            backgroundColor: backInterpolation,
            opacity: this.state.animation,
            transform: [
                {
                    rotate: rotateInterpolation
                },
                {
                    translateX: this.state.animationT,                    
                },
                {
                    translateY: this.state.animationT,   
                },
                {
                    scale: this.state.animationS,                    
                }
            ]
        }

        const animatedSatylesNoNative = {
            width: this.state.animationWidth,
            height: this.state.animationHeight,
        }


        return (
            <View style={styles.container}>
              <ScrollView style={[styles.containerA, ]}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.animationBackScroll
                            }
                        }
                    }
                ],{useNativeDriver:false})}
              >
                  <Animated.View style={[styles.containerAInner, {backgroundColor: backScrollInterpolation}]}>
                      <Text>Section 2</Text>
                    <Animated.View style={[styles.box, animatedStales, animatedSatylesNoNative]} >
                        <Animated.Text style={colTextAnimatedStyle}>Bienvenido</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.box, animatedStales, animatedSatylesNoNative]} >
                        <Animated.Text style={colTextAnimatedStyle}>Bienvenido</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.box, animatedStales, animatedSatylesNoNative]} >
                        <Animated.Text style={colTextAnimatedStyle}>Bienvenido</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.box, animatedStales, animatedSatylesNoNative]} >
                        <Animated.Text style={colTextAnimatedStyle}>Bienvenido</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.box, animatedStales, animatedSatylesNoNative]} >
                        <Animated.Text style={colTextAnimatedStyle}>Bienvenido</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.box, animatedStales, animatedSatylesNoNative]} >
                        <Animated.Text style={colTextAnimatedStyle}>Bienvenido</Animated.Text>
                    </Animated.View>

                  </Animated.View>

                </ScrollView>
                <View style={styles.containerB}>
                    <View style={styles.buttonS}>
                      <Button
                            title="Opacity"
                            onPress={this.startAnimation}
                            color="#2EC4B6"
                        />
                    </View>
                    <View style={styles.buttonS}>
                      <Button
                            title="Translate"
                            onPress={this.startAnimationT}
                            color="#2EC4B6"
                        />
                    </View>
                    <View style={styles.buttonS}>
                      <Button
                            title="Scale"
                            onPress={this.startAnimationS}
                            color="#2EC4B6"
                        />
                    </View>
                    <View style={styles.buttonS}>
                      <Button
                            title="Width"
                            onPress={this.startAnimationWidth}
                            color="#2EC4B6"
                        />
                    </View>
                    <View style={styles.buttonS}>
                      <Button
                            title="Height"
                            onPress={this.startAnimationHeight}
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
                    <View style={styles.buttonS}>
                      <Button
                            title="Rotate"
                            onPress={this.startAnimationRotate}
                            color="#2EC4B6"
                        />
                    </View>
                    <View style={styles.buttonS}>
                      <Button
                            title="Spring"
                            onPress={this.startAnimationTranslateWithSpring}
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
                    <View style={styles.buttonS}>
                      <Button
                            title="Color"
                            onPress={this.startAnimationColor}
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
            </View>
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerB: {
        flex: 0.3,
        alignItems: "center",
        paddingTop:10,
        flexDirection: "row",
        backgroundColor:"#ffdfb4",
        flexWrap:"wrap",
        
    },
    box: {
        // width: 150,
        // height: 150,
        // backgroundColor: "tomato",
        marginTop:10
    },
    buttonS: {
        marginTop:5,
        marginLeft:5,
        backgroundColor:"#CBF3F0"
    }
})