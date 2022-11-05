import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import styles from "../../styles/Partner/dashboard.module.scss";
import { getTokenCookie, parseJWT } from "../../Utils/auth/authHelper";
import { createRef, uploadFile } from "../../Utils/firebase/firebase";
import { MaterialIcon, Rupee } from "../../Utils/Helper";
import Toast, { IToast } from "../../Components/Toast/Toast";
import { useRouter } from "next/router";

const roomArr = [
  {
    id: 1,
    name: "Standard Room",
    price: 2000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
    photos: [
      "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1608198399988-341f712c3711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80",
    ],
    capacity: 2,
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 2500,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
    photos: [
      "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1608198399988-341f712c3711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80",
    ],
    capacity: 4,
  },
  {
    id: 3,
    name: "Suite Room",
    price: 3000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
    photos: [
      "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1608198399988-341f712c3711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80",
    ],
    capacity: 6,
  },
];

interface IModalProps {
  modalHeader: string;
  setModalState: Dispatch<
    SetStateAction<{
      modalHeader: string;
      show: boolean;
      modalContent: JSX.Element;
    }>
  >;
  children: JSX.Element;
}

const Dashboard = ({ hotelData }: { hotelData: any }) => {
  const [modalState, setModalState] = useState<{
    modalHeader: string;
    show: boolean;
    modalContent: JSX.Element;
  }>({
    modalHeader: "",
    show: false,
    modalContent: <Fragment />,
  });
  const router = useRouter();

  const [toastState, setToastState] = useState<IToast>({
    message: "̥",
    visible: false,
    type: "info",
  });

  const Modal = ({ modalHeader, setModalState, children }: IModalProps) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5>{modalHeader}</h5>
            <button
              onClick={() =>
                setModalState((prevModalState) => ({
                  ...prevModalState,
                  show: false,
                }))
              }
              className={styles.close}
            >
              <MaterialIcon iconName="close" />
            </button>
          </div>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    );
  };

  const ImagePreviewModalBody = ({ imageSrc }: { imageSrc: string }) => {
    return (
      <div className={styles.imagePreviewBody}>
        <Image src={imageSrc} layout="fill" objectFit="cover" alt="Image preview" />
      </div>
    )
  }

  const HotelImageUploadModalBody = () => {
    const [fileState, setFileState] = useState<{
      files: {
        file: File;
        name: string;
        type: string;
        size: number;
      }[];
      uploadProgress: number;
    }>({
      files: [],
      uploadProgress: 0,
    });


    const uploadFileInp = useRef<HTMLInputElement>(null);

    const removeFile = (file: File) => {
      setFileState((prevFileState) => ({
        ...prevFileState,
        files: prevFileState.files.filter((f) => f.file !== file),
      }));
    };

    const uploadFiles = async () => {
      try {
        const downloadUrls: string[] = [];
        for await (const file of fileState.files) {
          const fileRef = createRef(`${hotelData.name}/images/${file.name}`);
          const downloadUrl = await uploadFile(fileRef, file.file);
          downloadUrls.push(downloadUrl);
        }
        const response = await fetch("/api/hotel/updateHotelPhotos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            photoURLS: downloadUrls,
          }),
        });
        if (!response.ok) {
          setToastState({
            message: "files not uploaded successfully",
            visible: true,
            type: "error",
          });
          return;
        }
        setToastState({
          message: "All files successfully uploaded",
          type: "success",
          visible: true,
        });
      } catch (error) {
        console.log(error);
        setToastState({
          message: "Error uploading files",
          type: "success",
          visible: true,
        });
      }
    };

    return (
      <div
        className={styles.fileModalBody}
        onDrop={(e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          // map files to an array of file objects
          const filesArray = Array.from(files)
            .map((file) => ({
              file,
              name: file.name,
              type: file.type,
              size: file.size,
            }))
            .filter((file) => {
              const validTypes = ["image/png", "image/jpeg", "image/jpg"];
              return validTypes.indexOf(file.type) !== -1;
            });

          setFileState((prevFileState) => ({
            ...prevFileState,
            files: [...prevFileState.files, ...filesArray],
          }));
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <input
          ref={uploadFileInp}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              const filesArray = Array.from(files)
                .map((file) => ({
                  file,
                  name: file.name,
                  type: file.type,
                  size: file.size,
                }))
                .filter((file) => {
                  const validTypes = ["image/png", "image/jpeg"];
                  return validTypes.indexOf(file.type) !== -1;
                });
              setFileState((prevFileState) => ({
                ...prevFileState,
                files: [...prevFileState.files, ...filesArray],
              }));
              e.target.value = "";
            }
          }}
        />
        <div className={styles.fileModalHeader}
          onClick={() => uploadFileInp.current && uploadFileInp.current.click()}
        >
          <h5>Click or drag and drop files here</h5>
          <button
            className="btn btn-info"
            onClick={(e) => {
              uploadFiles();
              e.stopPropagation();
            }}
          >
            Upload
          </button>
        </div>
        <div className={styles.fileModalFilesContainer}>
          {fileState.files.map((file, index) => (
            <div key={index} className={styles.fileModalFile}>
              <div className={styles.fileImageContainer}>
                <Image
                  src={URL.createObjectURL(file.file)}
                  layout={"fill"}
                  objectFit={"cover"}
                  alt={file.name}
                />
              </div>
              <div className={styles.fileContent}>
                <small>{file.name}</small>
                <button
                  className="btn btn-danger"
                  onClick={(e) => { removeFile(file.file); e.stopPropagation() }}
                >
                  discard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AddRoomModalBody = () => {
    interface IRoom {
      name: string;
      price: string;
      photosDownloadUrl: string[];
      capacity: string;
      amenities: {
        name: string;
        icon: string;
      }[];
    }

    const [roomState, setRoomState] = useState<IRoom>({
      name: "",
      price: "0",
      capacity: "1",
      amenities: [],
      photosDownloadUrl: [],
    });

    const [roomPhotos, setRoomPhotos] = useState<{
      files: {
        file: File;
        name: string;
        type: string;
        size: number;
      }[];
    }>({
      files: []
    });

    const uploadFileInp = useRef<HTMLInputElement>(null);

    const removeFile = (file: File) => {
      setRoomPhotos((prevFileState) => ({
        ...prevFileState,
        files: prevFileState.files.filter((f) => f.file !== file),
      }));
    };

    const addRoom = async () => {
      try {
        const downloadUrls: string[] = [];
        for await (const file of roomPhotos.files) {
          const fileRef = createRef(`${hotelData.name}/images/${file.name}`);
          const downloadUrl = await uploadFile(fileRef, file.file);
          downloadUrls.push(downloadUrl);
        }
        const response = await fetch("/api/hotel/addRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(roomState),
        });
        if (!response.ok) {
          setToastState({
            message: "Room not added successfully",
            visible: true,
            type: "error",
          });
          return;
        }
        setToastState({
          message: "Room successfully added",
          type: "success",
          visible: true,
        });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className={styles.addRoomModalBody}>
        <form>
          <input type="text" placeholder="Room Name : " value={roomState.name} onChange={e => setRoomState(prevState => ({ ...prevState, name: e.target.value }))} />
          <input type={"text"} placeholder="Room Price : " value={roomState.price} onChange={e => setRoomState(prevState => ({ ...prevState, price: e.target.value }))} />
          <input type={"number"} placeholder="Capacity" value={roomState.capacity} onChange={e => setRoomState(prevState => ({ ...prevState, capacity: e.target.value }))} />
          <button className="btn" disabled={!roomState || !roomState.price || !roomState.capacity} >Add room</button>
        </form>
        <div
          className={styles.fileModalBody}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            // map files to an array of file objects
            const filesArray = Array.from(files)
              .map((file) => ({
                file,
                name: file.name,
                type: file.type,
                size: file.size,
              }))
              .filter((file) => {
                const validTypes = ["image/png", "image/jpeg", "image/jpg"];
                return validTypes.indexOf(file.type) !== -1;
              });
            setRoomPhotos((prevState) => ({ files: [...prevState.files, ...filesArray] }))
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <input
            ref={uploadFileInp}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const filesArray = Array.from(files)
                  .map((file) => ({
                    file,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                  }))
                  .filter((file) => {
                    const validTypes = ["image/png", "image/jpeg"];
                    return validTypes.indexOf(file.type) !== -1;
                  });
                setRoomPhotos((prevState) => ({ files: [...prevState.files, ...filesArray] }))
                e.target.value = "";
              }
            }}
          />
          <div className={styles.fileModalHeader}
            onClick={() => uploadFileInp.current && uploadFileInp.current.click()}
          >
            <h5>Click or drag and drop files here</h5>
          </div>
          <div className={styles.fileModalFilesContainer}>
            {roomPhotos.files.map((file, index) => (
              <div key={index} className={styles.fileModalFile}>
                <div className={styles.fileImageContainer}>
                  <Image
                    src={URL.createObjectURL(file.file)}
                    layout={"fill"}
                    objectFit={"cover"}
                    alt={file.name}
                  />
                </div>
                <div className={styles.fileContent}>
                  <small>{file.name}</small>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFile(file.file)}
                  >
                    discard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  };

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.sectionHeader}>
          <h5>Hotel Information</h5>
        </div>
        <div className={styles.descContainer}>
          <div className={styles.descRowOne}>
            <div className={styles.iconContainer}>
              <MaterialIcon iconName="hotel" />
            </div>
            <div className={styles.descContent}>
              <div className={styles.descHeader}>
                <h4>{hotelData.name}</h4>
              </div>
              <div className={styles.descDetailContainer}>
                <div className={styles.descDetails}>
                  <p>Place : </p>
                  <p className={styles.fontDark}>
                    {hotelData.city}, {hotelData.state}
                  </p>
                </div>
                <div className={styles.descDetails}>
                  <p>Adrress : </p>
                  <p className={styles.fontDark}>{hotelData.address}</p>
                </div>
                <div className={styles.descDetails}>
                  <p className={styles.fontLight}>Mail : </p>
                  <a href={`mailto:${hotelData.email}`}>
                    <p className={styles.fontDark}>{hotelData.email}</p>
                  </a>
                </div>
                <div className={styles.descDetails}>
                  <p className={styles.fontLight}>Phone : </p>
                  <a href={`tel:${hotelData.phone}`}>
                    <p className={styles.fontDark}>{hotelData.phone}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={styles.descRowTwo}>
            <div className={styles.contentItem}>
              <p>Available Rooms types</p>
              <h5>{roomArr.length}</h5>
            </div>
            <div className={styles.contentItem}>
              <p>Ratings</p>
              <small>
                <span>{hotelData.ratingsAverage}</span>
              </small>
            </div>
            <div className={styles.contentItem}>
              <p>Check in</p>
              <h5>9:00 AM</h5>
            </div>
            <div className={styles.contentItem}>
              <p>Check out</p>
              <h5>6:00 PM</h5>
            </div>
          </div>
        </div>
        <div className={styles.sectionHeader}>
          <h5>Hotel Photos</h5>
          <div className={styles.btnOptions}>
            <button
              className="btn"
              onClick={() => {
                setModalState({
                  modalHeader: "Add Photos",
                  show: true,
                  modalContent: <HotelImageUploadModalBody />,
                });
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className={styles.photosContainer}>
          {hotelData.images.map((imageSrc: string, i: number) => (
            <div className={styles.photoCard} key={i} onClick={() => {
              setModalState({
                modalHeader: "Add Photos",
                show: true,
                modalContent: <ImagePreviewModalBody imageSrc={imageSrc} />,
              });
            }} >
              <Image
                src={imageSrc}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="hotel"
              />
              <button className="btn btn-danger">
                <MaterialIcon iconName="delete" />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.sectionHeader}>
          <h5>Available rooms</h5>
          <div className={styles.btnOptions}>
            <button className="btn" onClick={() => {
              setModalState({
                modalHeader: "Add Photos",
                show: true,
                modalContent: <AddRoomModalBody />,
              });
            }} >Add Rooms</button>
          </div>
        </div>
        <div className={styles.roomsContainer}>
          {roomArr.map((roomData, index) => (
            <div className={styles.roomCard} key={index}>
              <div className={styles.roomImage}></div>
              <div className={styles.roomDetails}>
                <p>{roomData.name}</p>
                <p>
                  <Rupee /> {roomData.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sectionHeader}>
          <h5>Bookings</h5>
          <div className={styles.btnOptions}>
            <button onClick={() => router.push("/partner/bookings")} >View</button>
          </div>
        </div>
        <table className={styles.bookingsTable}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer Name</th>
              <th>Room Type</th>
              <th>Check In Date</th>
              <th>Payment Method</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td>123456</td>
                  <td>John Doe</td>
                  <td>Deluxe Room</td>
                  <td>12/12/2021</td>
                  <td>Paypal</td>
                  <td>
                    <button>View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalState.show && (
        <Modal
          modalHeader={modalState.modalHeader}
          setModalState={setModalState}
        >
          {modalState.modalContent}
        </Modal>
      )}
      <Toast toastState={toastState} setToastState={setToastState} />̥
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const token = getTokenCookie(ctx);
  const userToken = parseJWT(token);

  if (!userToken || userToken.role !== "Hotel") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (userToken && userToken.role === "Hotel") {
    const { slug } = userToken;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/hotel/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return {
          notFound: true,
        };
      }

      const res = await response.json();

      return {
        props: {
          hotelData: res.data,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};
