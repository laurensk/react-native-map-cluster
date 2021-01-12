# React Native Map Cluster
Create clustered map views in React Native with current user location, custom marker rendering, custom cluster rendering and custom callout rendering.

## Install
`npm i --save react-native-map-cluster`

## Usage

**NOTES:**

* the prop `key` of the markers rendered through `renderMarker` should not be left up to React. Instead, we strongly suggest to use an `id` in order the have unique keys while still taking advantage of React's recycling
* `ClusteredMapView` supports usual React children. Those children **won't be affected by clustering**, i.e. the behavior for those children is exactly the same as wrapping them around an [AirBnB's react-native-maps](https://github.com/airbnb/react-native-maps) instance
* Use `onMarkerPress` event on MapView instead of using `onPress` directly on Markers whenever possibile, in particular if you have a lot of pins and clusters. Within `onMarkerPress` you have access to the marker identifier through the `event.nativeEvent` attribute, hence you should be able to do everything you would do within an `onPress` function of a Marker

```JSX
import React, { Component } from 'react'
import { Marker, Callout } from 'react-native-maps'
import ClusteredMapView from 'react-native-map-cluster'

const INIT_REGION = {
  latitude: 41.8962667,
  longitude: 11.3340056,
  latitudeDelta: 12,
  longitudeDelta: 12
}

export default class MyClusteredMapView extends Component {

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    const clusteringEngine = this.map.getClusteringEngine(),
          clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>
            {pointCount}
          </Text>
        </View>
        {
          /*
            Eventually use <Callout /> to
            show clustered point thumbs, i.e.:
            <Callout>
              <ScrollView>
                {
                  clusteredPoints.map(p => (
                    <Image source={p.image}>
                  ))
                }
              </ScrollView>
            </Callout>
           */
        }
      </Marker>
    )
  }

  renderMarker = (data) => <Marker key={data.id || Math.random()} coordinate={data.location} />

  render() {
    return (
      <ClusteredMapView
        style={{flex: 1}}
        data={this.state.data}
        initialRegion={INIT_REGION}
        ref={(r) => { this.map = r }}
        renderMarker={this.renderMarker}
        renderCluster={this.renderCluster} />
    )
  }
}
```

### Props

**Name** | **Type** | **Required** | **Default** | **Note**
---------|----------|--------------|-------------|---------
showsUserLocation | Bool | false | undefined | Show current location on map.
permissionsAndroid | Object | false | undefined | Needed when `showsUserLocation` is set to true. See example [here](https://reactnative.dev/docs/permissionsandroid#request).
radius | Number | false | window width * 4,5% | [SuperCluster radius](https://github.com/mapbox/supercluster#options).
extent | Number | false | 512 | [SuperCluster extent](https://github.com/mapbox/supercluster#options).
minZoom | Number | false | 1 | [SuperCluster minZoom](https://github.com/mapbox/supercluster#options).
maxZoom | Number | false | 16 | [SuperCluster maxZoom](https://github.com/mapbox/supercluster#options).
width | Number | false | window width | map's width.
height | Number | false | window height | map's height.
data | Array <Object> | true | undefined | Objects must have an attribute `location` representing a `GeoPoint`, i.e. `{ latitude: x, longitude: y }`.
onExplode | Function | false | undefined | TODO
onImplode | Function | false | undefined | TODO
onClusterPress(clusterId, ?children) | Function | false |  | Add (or completey override) behaviours to the clusterPress handler. `children` is passed when default behavior is preserved (see `preserveClusterPressBehavior` prop).
preserveClusterPressBehavior | Bool | false | true | Whether `onClusterPress` prop should completely override module's behavior rather than integrate it.
clusterPressMaxChildren | Function | false | 100 | Max number of cluster leaves returned as second parameter of `onClusterPress`.
edgePadding | Object | false | { top: 10, left: 10, bottom: 10, right: 10 } | Edge padding for [react-native-maps's](https://github.com/react-community/react-native-maps/blob/master/docs/mapview.md#methods) `fitToCoordinates` method, called in `onClusterPress` for fitting to pressed cluster children.
renderMarker | Function | true | undefined | Must return a react-native-maps' Marker component.
renderCluster | Function | true | undefined | Render the cluster.
animateClusters | Bool | false | true | Animate imploding/exploding of clusters' markers and clusters size change. **Works only on iOS**.
layoutAnimationConf | LayoutAnimationConfig | false | `LayoutAnimation.Presets.spring` | Custom Layout animation configuration object for clusters animation during implode / explode **Works only on iOS**.
clusteringEnabled | Bool | false | true | Dynamically set whether to pass through clustering functions or immediately render markers as a normal mapview.
accessor | String\|Func | false | "location" | Accessor for item coordinate values. Could be a **string** (field name of an item object with latitude and longitude values) or a **function** (that describes how to access to coordinate data).

### Methods
**Name** | **Params** | **Description** | **Note**
---------|------------|-----------------|---------
getMapRef | none | Getter for underlying react-native-maps instance | [Official Doc](https://github.com/react-community/react-native-maps#component-api)
getClusteringEngine | none | Getter for underlying SuperCluster instance | [Official Doc](https://github.com/mapbox/supercluster)

## Credit

This repository is a fork of [react-native-maps-super-cluster](https://github.com/novalabio/react-native-maps-super-cluster) with many more features and updated implementations.