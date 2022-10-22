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
import styles from '../styles/Search/search.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ExploreHome: NextPage = () => {
  const [viewportState, setViewportState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 12.5
  });

  // useEffect(() => {
  //   //  get location from browser
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position.coords);

  //     setViewportState({
  //       ...viewportState,
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     });
  //   });
  // }, []);

  return (
    <Layout>
      <div className={styles.filterSection}></div>
      <div className={styles.container}>
        <div className={styles.contentSection}>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <CardTypeOne key={index} />
            ))}
        </div>
        <div className={styles.mapSection}>
          <ReactMapGL
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/shobhit24/ckopb9huq8vwt18qvw4gxh271"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''}
            onMove={(e) => setViewportState(e.viewState)}
            latitude={viewportState.latitude}
            longitude={viewportState.longitude}
            zoom={viewportState.zoom}
            attributionControl={false}
          >
            <GeolocateControl showAccuracyCircle />
            <AttributionControl customAttribution="Albergo" />
            <NavigationControl />
            <Marker longitude={-100} latitude={40} anchor="top">
              <div className={styles.markerLabel}>
                <div className={styles.iconContainer}>
                  <Image
                    src="/assets/icons/apartment_FILL1_wght400_GRAD0_opsz40.svg"
                    alt="albergo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <small>Albergo</small>
              </div>
            </Marker>
          </ReactMapGL>
        </div>
      </div>
    </Layout>
  );
};

export default ExploreHome;
