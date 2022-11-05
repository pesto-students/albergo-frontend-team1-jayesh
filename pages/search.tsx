import { GetStaticProps, NextPage } from 'next';
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
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '../Components/Loading/Loading';
import { useRouter } from 'next/router';

interface ISearchProps {
  data?: any;
}

const Search: NextPage<ISearchProps> = ({ data }) => {
  const [dataArr, setDataArr] = useState(data ?? []);

  const [formInp, setFormInp] = useState({
    name: '',
    city: '',
    state: '',
    country: ''
  });

  const [viewportState, setViewportState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 12.5
  });

  const router = useRouter();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      setViewportState((prevState) => ({
        ...prevState,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }));
    });
  }, []);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // raw object to consist of only the values that are not empty
    const raw = Object.fromEntries(
      Object.entries(formInp).filter(([key, value]) => value !== '')
    );
    const res = await fetch('/api/hotel/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(raw)
    });
    const data = await res.json();
    if (!res.ok) setDataArr([]);
    else setDataArr(data?.data);
  };

  return (
    <Layout>
      <div className={styles.filterSection}></div>
      <div className={styles.container}>
        <div className={styles.contentSection}>
          <form className={styles.contentHeader} onSubmit={formSubmitHandler}>
            <input
              type="text"
              placeholder="Search By Name"
              value={formInp.name}
              onChange={(e) =>
                setFormInp((prevState) => ({
                  ...prevState,
                  name: e.target.value
                }))
              }
            />
            <input
              type="text"
              placeholder="Search By City"
              value={formInp.city}
              onChange={(e) =>
                setFormInp((prevState) => ({
                  ...prevState,
                  city: e.target.value
                }))
              }
            />
            <input
              type="text"
              placeholder="Search By State"
              value={formInp.state}
              onChange={(e) =>
                setFormInp((prevState) => ({
                  ...prevState,
                  state: e.target.value
                }))
              }
            />
            <input
              type="text"
              placeholder="Search By Country"
              value={formInp.country}
              onChange={(e) =>
                setFormInp((prevState) => ({
                  ...prevState,
                  country: e.target.value
                }))
              }
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={
                !formInp.name &&
                !formInp.city &&
                !formInp.state &&
                !formInp.country
              }
            >
              Search
            </button>
          </form>
          <div className={styles.contentBody}>
            {dataArr.length > 0 ? (
              <Fragment>
                {dataArr.map(
                  (
                    item: {
                      [key: string]: any;
                    },
                    index: number
                  ) => (
                    <CardTypeOne
                      key={index}
                      itemData={item}
                      onClickFn={() => router.push(`/hotel/${item.slug}`)}
                    />
                  )
                )}
              </Fragment>
            ) : (
              <h5>No Data found</h5>
            )}
          </div>
        </div>
        <div className={styles.mapSection}>
          <ReactMapGL
            style={{
              width: '100%',
              height: '100%'
            }}
            mapStyle="mapbox://styles/shobhit24/ckopb9huq8vwt18qvw4gxh271"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''}
            onMove={(e) => setViewportState(e.viewState)}
            latitude={viewportState.latitude}
            longitude={viewportState.longitude}
            zoom={viewportState.zoom}
            attributionControl={false}
            antialias={true}
            cooperativeGestures={true}
          >
            <GeolocateControl showAccuracyCircle />
            <AttributionControl customAttribution="Albergo" />
            <NavigationControl />
            {dataArr.length > 0 &&
              dataArr.map((item: any, index: number) => (
                <Marker
                  longitude={item.coordinates?.long}
                  latitude={item.coordinates?.lat}
                  anchor="top"
                  key={index}
                  onClick={() => {
                    const hotelCard = document.getElementById(
                      `card-${item.slug}`
                    );
                    if (hotelCard) {
                      hotelCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                      });
                    }
                  }}
                >
                  <div className={styles.markerLabel}>
                    <div className={styles.iconContainer}>
                      <Image
                        src="/assets/icons/apartment_FILL1_wght400_GRAD0_opsz40.svg"
                        alt="albergo"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <small>{item?.name}</small>
                  </div>
                </Marker>
              ))}
          </ReactMapGL>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    const data = await response.json();

    return {
      props: {
        data: data?.latestHotels ?? []
      },
      revalidate: 90
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 90
    };
  }
};
