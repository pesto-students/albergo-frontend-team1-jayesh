import descriptionStyles from '../../styles/Partner/description.module.scss';
import Layout from '../../Components/Layout/Layout';
import { useState } from 'react';

const Description = () => {
  const hotelName = 'Golden Beach Resort';
  const [formState, setFormState] = useState({
    name: {
      initialValue: hotelName,
      editedValue: hotelName,
      isEdited: false
    }
  });

  return (
    <Layout>
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
      </form>
    </Layout>
  );
};

export default Description;
