import { NextPage } from 'next';
import CardTypeOne from '../Components/Card/CardTypeOne';
import Layout from '../Components/Layout/Layout';
import ReactMapGL, {
  AttributionControl,
  GeolocateControl,
  Marker,
  NavigationControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import searchStyles from '../styles/Search/search.module.scss';
import { useEffect, useState } from 'react';

const ExploreHome: NextPage = () => {
  const [viewportState, setViewportState] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11
  });

  useEffect(() => {
    //  get location from browser
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);

      setViewportState({
        ...viewportState,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }, []);

  return (
    <Layout>
      <div className={searchStyles.filterSection}></div>
      <div className={searchStyles.container}>
        <div className={searchStyles.contentSection}>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <CardTypeOne key={index} />
            ))}
        </div>
        <div className={searchStyles.mapSection}>
          <ReactMapGL
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/shobhit24/ckopb9huq8vwt18qvw4gxh271"
            // // {...viewportState}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''}
            // mapStyle="mapbox://styles/mapbox/ckszotu58a7dz17qh8ysv970j"
            onMove={(e) => setViewportState(e.viewState)}
            latitude={viewportState.latitude}
            longitude={viewportState.longitude}
            zoom={viewportState.zoom}
            attributionControl={false}
          >
            <GeolocateControl showAccuracyCircle />
            <AttributionControl customAttribution="Albergo" />
            <NavigationControl />
          </ReactMapGL>
        </div>
      </div>
    </Layout>
  );
};

export default ExploreHome;
