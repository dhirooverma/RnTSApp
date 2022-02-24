import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    Button,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from 'react-native';
import colors from '../constants/colors';
import styles from '../constants/customStyle';
import { get } from 'lodash';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("");

const MapScreen = (props: any) => {
    const regions = {
        india: {
            maharashtra: {
                nashik: {
                    title: "nashik",
                    cordinate: [73.7898, 19.9975],
                    impact: 'normal',
                    trapId: [1, 2]
                },
                pune: {
                    title: "pune",
                    cordinate: [73.8567, 18.5204],
                    impact: 'normal',
                    trapId: [2]
                },
                mumbai: {
                    title: "mumbai",
                    cordinate: [72.877, 19.076],
                    impact: 'high',
                    trapId: [1, 2]
                },
            },
            up: {
                noida: {
                    title: "noida",
                    cordinate: [77, 28],
                    impact: 'high',
                    trapId: [3, 4]
                },
                prayagraj: {
                    title: "prayagraj",
                    cordinate: [81.84, 25.455],
                    impact: 'low',
                    trapId: [4, 3]
                },
                varanasi: {
                    title: "varanasi",
                    cordinate: [83, 25],
                    impact: 'normal',
                    trapId: [4]
                },
                jhansi: {
                    title: "jhansi",
                    cordinate: [78, 25],
                    impact: 'low',
                    trapId: [3]
                },
                lucknow: {
                    title: "lucknow",
                    cordinate: [80.9470, 26.8470],
                    impact: 'normal',
                    trapId: [4]
                },
                pratapgarh: {
                    title: "pratapgarh",
                    cordinate: [81, 25],
                    impact: 'normal',
                    trapId: [3]
                },
            }
        }
    }

    // id will be connected to trapId
    const trapData = {
        1: {
            id: 1,
            img: "https://some_image_url.com",
            insect_count: 5,
            date: 1645011543000,
            crop: 'rice',
            insect_name: "Brown Planthopper",

        },
        2: {
            id: 2,
            img: '',
            insect_count: 0,
            date: 1645011543000,
            crop: 'rice',
            insect_name: "Brown Planthopper",
        },
        3: {
            id: 3,
            img: "https://some_image_url.com",
            insect_count: 0,
            date: 1645011543000,
            crop: 'wheat',
            insect_name: "Brown Planthopper",
        },
        4: {
            id: 4,
            img: '',
            insect_count: 0,
            date: 1645011543000,
            crop: 'wheat',
            insect_name: "Brown Planthopper",
        },
    }
    const [labelSwitch, toggleSwitch] = useState(true);
    const [isVisibleDetail, setVisibleDetail] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [coordinates] = useState([78.9629, 20.5937]);
    const [selectedRegions, setSelectedRegions] = useState(Object.keys(regions['india']));
    const isDarkMode = useColorScheme() === 'dark';
    const impactColor = {
        "normal": colors.Green,
        "low": colors.Yellow,
        "high": colors.Red,
        "none": colors.Grey
    }
    let activeTrapDetail;

    props.navigation.setOptions({
        title: `INDIA`,
        headerRight: () => <TouchableHighlight style={{ marginRight: 10 }} onPress={openModal}><Ionicons name="filter-sharp" color={colors.Black} size={25} /></TouchableHighlight>
    })

    const showDetailModal = (regionChildData) => {
        console.log(regionChildData);
        activeTrapDetail = regionChildData;
        setVisibleDetail(true);
        console.log("activeTrapDetail", activeTrapDetail);
    }

    const renderAnnotations = (regionChildData) => {
        // console.log(cordinate, title, impact);
        return (
            <MapboxGL.PointAnnotation
                key={regionChildData.title}
                id={regionChildData.title}
                coordinate={regionChildData.cordinate}
                onSelected={() => { showDetailModal(regionChildData); }}
            >
                <View style={{ backgroundColor: 'transparent' }}>
                    <Ionicons name="location" size={30} color={impactColor[regionChildData.impact]} />
                    {labelSwitch ? <Text style={{ backgroundColor: 'rgba(256,0,0,0.3)' }}>{regionChildData.title}</Text> : null}
                </View>
            </MapboxGL.PointAnnotation>
        );
    };

    const openModal = () => {
        if (!props.disabled) {
            setVisible(true);
        }
    }

    const closeModal = () => {
        setVisible(false);
    }

    const closeModalDetail = () => {
        setVisibleDetail(false);
    }

    const filterRegions = (selectedOption) => {
        let newRegions: any = [];
        if (selectedRegions.includes(selectedOption)) {
            newRegions = selectedRegions.filter((val) => val != selectedOption);
        } else {
            newRegions = [...selectedRegions, selectedOption];
        }
        console.log(newRegions);
        setSelectedRegions(newRegions);
    }

    const getSelectedRegion = () => {
        let selectedRegionData: any = [];
        selectedRegions.forEach((region: string) => {
            selectedRegionData.push(...Object.values(regions['india'][region]));
        });
        return selectedRegionData;
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <View style={{ borderTopWidth: 1, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(256,256,256,0.5)', width: '100%', height: 40, position: 'absolute', zIndex: 100 }}>
                    {selectedRegions.map((title) => <View style={{ borderRadius: 5, paddingHorizontal: 5, margin: 5, backgroundColor: colors.LightBlack }}><Text style={styles.label}>{title.toUpperCase()}</Text></View>)}
                </View>
                <View style={{ height: "100%", width: "100%", backgroundColor: 'blue', }}>
                    <MapboxGL.MapView key={`${labelSwitch}${selectedRegions.join()}`} style={{ flex: 1 }}>
                        <MapboxGL.Camera key={"111"} zoomLevel={4} centerCoordinate={coordinates} />
                        {/* <MapboxGL.PointAnnotation id={"2"} coordinate={coordinates} /> */}
                        <View>{
                            getSelectedRegion().map((regionChild) => renderAnnotations(regionChild))
                        }</View>
                    </MapboxGL.MapView>
                </View>
                <View style={{ backgroundColor: 'rgba(256,256,256,0.5)', width: '10%', height: 40, position: 'absolute', zIndex: 100, bottom: 10 }}>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={labelSwitch}
                    />
                </View>
                <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                    style={styles.modalView}
                // onDismiss={() => { setSelectedValue(itemValue) }}
                // onOrientationChange={(evnt) => {
                //     console.log(evnt);
                // }}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalContainerStyle}>
                            <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
                                <View style={styles.modalContent}>
                                    {Object.keys(regions['india']).map((title) => <TouchableWithoutFeedback onPress={() => { filterRegions(title) }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5, paddingHorizontal: 5, margin: 5, backgroundColor: selectedRegions.includes(title) ? colors.Black : colors.Grey }}>
                                            <Text style={styles.label}>{title.toUpperCase()}</Text>
                                            {selectedRegions.includes(title) && <Ionicons name='checkmark-sharp' size={25} color={colors.White} />}
                                        </View>
                                    </TouchableWithoutFeedback>)}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType="slide"
                    transparent={true}
                    visible={isVisibleDetail}
                    style={styles.modalView}
                // onDismiss={() => { setSelectedValue(itemValue) }}
                // onOrientationChange={(evnt) => {
                //     console.log(evnt);
                // }}
                >
                    <TouchableWithoutFeedback onPress={closeModalDetail}>
                        <View style={styles.modalContainerStyle}>
                            <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
                                <View style={{ ...styles.modalContent, height: '80%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5, paddingHorizontal: 5, margin: 5, backgroundColor: colors.Black }}>
                                        {activeTrapDetail && <Text style={styles.label}>{activeTrapDetail.title}</Text>}
                                        <Text style={styles.label}>sghjgdsjhgjhg</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </SafeAreaView>
        </View>
    );
};

export default MapScreen;