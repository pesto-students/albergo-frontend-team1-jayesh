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
import { getHomePageResults, handleResponse, makeReq } from '../Utils/db';
import { IHotelData } from '../Utils/Helper';
import { useSnackbar } from 'notistack';

interface ISearchProps {
  data: IHotelData[] | null;
}

const Search: NextPage<ISearchProps> = ({ data }) => {

  const [dataArr, setDataArr] = useState(data);

  const router = useRouter();

  const [formInp, setFormInp] = useState({
    name: '',
    city: router.query.destination ?? router.asPath.split("?")[1]?.split("=")[1] ?? "",
    state: '',
    country: ''
  });

  const [viewportState, setViewportState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 4
  });

  const [loadingState, setLoadingState] = useState({
    state: true,
    message: "Please wait for a few moments"
  });

  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewportState((prevState) => ({
        ...prevState,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }));
    });

    if (formInp.city) {

      const raw = Object.fromEntries(
        Object.entries({ city: formInp.city }).filter(([key, value]) => value !== '')
      );

      Promise.resolve(makeReq('/api/hotel/search', "POST", raw)).then(resObj => {
        if (!resObj || !resObj.res?.data) {
          setLoadingState(prevState => ({ ...prevState, message: "No data found" }));
          return;
        }
        setDataArr(resObj?.res?.data);
        return;
      });
    }
  }, []);

  useEffect(() => {
    if (formInp.city === "" && formInp.country === "" && formInp.name === "" && formInp.state === "") {

      if (dataArr?.length === data?.length) return;

      Promise.resolve(getHomePageResults()).then(res => {

        const resData = res.data;

        const returnData = [] as any[];

        resData.forEach((category: any) => {
          returnData.push(...category.data);
        });

        setDataArr(returnData);
      });
    }
  }, [formInp.city, formInp.country, formInp.name, formInp.state]);


  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // raw object to consist of only the values that are not empty
    const raw = Object.fromEntries(
      Object.entries(formInp).filter(([key, value]) => value !== '')
    );

    const resObj = await makeReq('/api/hotel/search', "POST", raw);

    console.log(resObj);


    const res = handleResponse(resObj, enqueueSnackbar);

    if (res) {
      setDataArr(resObj.res?.data);
    }
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
            {dataArr && dataArr.length > 0 ? (
              <Fragment>
                {dataArr.map((item, index) => (
                  <CardTypeOne
                    key={index}
                    itemData={item}
                    onClickFn={() => router.push(`/hotel/${item.slug}`)}
                  />
                )
                )}
              </Fragment>
            ) : (
              <Loading message={loadingState.message} />
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
            {dataArr !== null && dataArr.length > 0 &&
              dataArr.map((item, index) => (
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

  const res = await getHomePageResults();

  let revalidateObj = {
    revalidate: 7200
  };

  if (!res) revalidateObj.revalidate = 300;

  const resData = res?.data ?? [];

  if (!resData.length) revalidateObj.revalidate = 300;

  if (resData.length === 0) return {
    props: {
      data: []
    },
    ...revalidateObj
  };

  const returnData = [] as any[];

  resData.forEach((category: any) => {
    returnData.push(...category.data);
  });

  return {
    props: {
      data: returnData
    },
    ...revalidateObj
  };
};
