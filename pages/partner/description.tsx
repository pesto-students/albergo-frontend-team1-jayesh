import descriptionStyles from '../../styles/Partner/description.module.scss';
import Layout from '../../Components/Layout/Layout';
import { useState } from 'react';

const Description = () => {
  const hotelName = 'Golden Beach Resort';
  const hotelPlace = 'Mumbai';
  const hotelLocality = 'Bandra';
  const hotelMail = 'someHotel@mumbai.com';
  const hotelPhone = '1234567890';
  const hotelHighlight = '1.5 km from Bandra Station';
  const bookingsOpen = true;

  const [formState, setFormState] = useState({
    name: {
      initialValue: hotelName,
      editedValue: hotelName,
      isEdited: false
    },
    place: {
      initialValue: hotelPlace,
      editedValue: hotelPlace,
      isEdited: false
    },
    locality: {
      initialValue: hotelLocality,
      editedValue: hotelLocality,
      isEdited: false
    },
    mail: {
      initialValue: hotelMail,
      editedValue: hotelMail,
      isEdited: false
    },
    phone: {
      initialValue: hotelPhone,
      editedValue: hotelPhone,
      isEdited: false
    },
    highlight: {
      initialValue: hotelHighlight,
      editedValue: hotelHighlight,
      isEdited: false
    },
    bookingsOpen: {
      initialValue: bookingsOpen,
      editedValue: bookingsOpen,
      isEdited: false
    }
  });

  return (
    <Layout>
      <h1>Edit Hotel Description</h1>
      <form className={descriptionStyles.formContainer}>
        <div className={descriptionStyles.inpNameContainer}>
          <label htmlFor="hotelName">Name : </label>
          <input
            type="text"
            name="hotelName"
            id="hotelName"
            value={formState.name.editedValue}
            onChange={(e) =>
              setFormState((prevFormState) => {
                return {
                  ...prevFormState,
                  name: {
                    ...prevFormState.name,
                    editedValue: e.target.value,
                    isEdited: prevFormState.name.initialValue !== e.target.value
                  }
                };
              })
            }
          />
        </div>
        <div className={descriptionStyles.checkboxInpContainer}>
          <h5>Open for Bookings : </h5>
          <div className={descriptionStyles.switch}>
            <input
              type="checkbox"
              name="bookingsOpen"
              id="bookingsOpen"
              defaultChecked={formState.bookingsOpen.editedValue}
              onChange={(e) =>
                setFormState((prevFormState) => {
                  return {
                    ...prevFormState,
                    bookingsOpen: {
                      ...prevFormState.bookingsOpen,
                      editedValue: e.target.checked,
                      isEdited:
                        prevFormState.bookingsOpen.initialValue !==
                        e.target.checked
                    }
                  };
                })
              }
            />
            <label htmlFor="bookingsOpen" />
          </div>
        </div>
        <div className={descriptionStyles.smallInpContainer}>
          <label htmlFor="hotelPlace">Place : </label>
          <input
            type="text"
            name="hotelPlace"
            id="hotelPlace"
            value={formState.place.editedValue}
            onChange={(e) =>
              setFormState((prevFormState) => {
                return {
                  ...prevFormState,
                  place: {
                    ...prevFormState.place,
                    editedValue: e.target.value,
                    isEdited:
                      prevFormState.place.initialValue !== e.target.value
                  }
                };
              })
            }
          />
        </div>
        <div className={descriptionStyles.smallInpContainer}>
          <label htmlFor="hotelLocality">Locality : </label>
          <input
            type="text"
            name="hotelLocality"
            id="hotelLocality"
            value={formState.locality.editedValue}
            onChange={(e) =>
              setFormState((prevFormState) => {
                return {
                  ...prevFormState,
                  locality: {
                    ...prevFormState.locality,
                    editedValue: e.target.value,
                    isEdited:
                      prevFormState.locality.initialValue !== e.target.value
                  }
                };
              })
            }
          />
        </div>
        <div className={descriptionStyles.smallInpContainer}>
          <label htmlFor="hotelMail">Mail : </label>
          <input
            type="mail"
            name="hotelMail"
            id="hotelMail"
            value={formState.mail.editedValue}
            onChange={(e) =>
              setFormState((prevFormState) => {
                return {
                  ...prevFormState,
                  mail: {
                    ...prevFormState.mail,
                    editedValue: e.target.value,
                    isEdited: prevFormState.mail.initialValue !== e.target.value
                  }
                };
              })
            }
          />
        </div>
        <div className={descriptionStyles.smallInpContainer}>
          <label htmlFor="hotelPhone">Phone : </label>
          <input
            type="tel"
            name="hotelPhone"
            id="hotelPhone"
            value={formState.phone.editedValue}
            onChange={(e) =>
              setFormState((prevFormState) => {
                return {
                  ...prevFormState,
                  phone: {
                    ...prevFormState.phone,
                    editedValue: e.target.value,
                    isEdited:
                      prevFormState.phone.initialValue !== e.target.value
                  }
                };
              })
            }
          />
        </div>
        <div className={descriptionStyles.smallInpContainer}>
          <label htmlFor="hotelHighlight">Highlight : </label>
          <input
            type="tel"
            name="hotelHighlight"
            id="hotelHighlight"
            value={formState.highlight.editedValue}
            onChange={(e) =>
              setFormState((prevFormState) => {
                return {
                  ...prevFormState,
                  highlight: {
                    ...prevFormState.highlight,
                    editedValue: e.target.value,
                    isEdited:
                      prevFormState.highlight.initialValue !== e.target.value
                  }
                };
              })
            }
          />
        </div>
      </form>
    </Layout>
  );
};

export default Description;
