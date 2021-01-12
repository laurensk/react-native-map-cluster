import React from "react";

interface ClusteredMapViewProps {
  // general props
  style?: object | null;
  data?: any[];
  initialRegion?: object;
  ref?: Function | null;
  renderMarker?: Function;
  renderCluster?: Function;
  showsUserLocation?: boolean | null;
  permissionsAndroid?: {
    title: string;
    message: string;
    buttonNeutral: string;
    buttonNegative: string;
    buttonPositive: string;
  } | null;

  // additional props
  radius?: number | null;
  extent?: number | null;
  minZoom?: number | null;
  maxZoom?: number | null;
  width?: number | null;
  height?: number | null;
  onExplode?: Function | null;
  onImplode?: Function | null;
  onClusterPress?: Function | null;
  preserveClusterPressBehavior?: boolean | null;
  clusterPressMaxChildren?: Function | null;
  edgePadding?: object | null;
  animateClusters?: boolean | null;
  layoutAnimationConf?: any | null;
  clusteringEnabled?: boolean | null;
  accessor?: String | Function | null;
}

declare class ClusteredMapView extends React.Component<ClusteredMapViewProps> {
  constructor(props: ClusteredMapViewProps);
}

export default ClusteredMapView;
