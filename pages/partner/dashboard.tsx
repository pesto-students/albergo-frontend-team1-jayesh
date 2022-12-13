import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import { ChangeEvent, Dispatch, FC, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import styles from "../../styles/Partner/dashboard.module.scss";
import { getTokenCookie, parseJWT } from "../../Utils/auth/authHelper";
import { createRef, storage, uploadFile } from "../../Utils/firebase/firebase";
import { generateUID, hotelFacilities, IFullHotelData, IRoomData, MaterialIcon, Rupee, SnackbarType } from "../../Utils/Helper";
import { handleResponse, makeReq } from "../../Utils/db";
import { OptionsObject as SnackbarOptions, SnackbarKey, SnackbarMessage, useSnackbar } from "notistack";
import { useAppSelector } from "../../redux/hooks";
import { deleteObject, ref } from "firebase/storage";
import TiptapEditor, { defaultEditorData } from "../../Components/Editorjs/Editor";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/router";

interface IModalState {
  modalHeader: string;
  show: boolean;
  modalContent: JSX.Element;
}

interface IModalProps {
  modalHeader: string;
  setModalState: Dispatch<
    SetStateAction<IModalState>
  >;
  children: JSX.Element;
}

const Modal: FC<IModalProps> = ({ modalHeader, setModalState, children }) => {
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

interface IAddFacilitiesProps {
  dashboardData: IFullHotelData;
  setDashboardData: Dispatch<SetStateAction<IDashboardState>>;
  userToken: string;
  enqueueSnackbar: SnackbarType;
  setModalState: Dispatch<SetStateAction<IModalState>>;
}

const AddFacilities: FC<IAddFacilitiesProps> = ({ dashboardData, setDashboardData, userToken, enqueueSnackbar, setModalState }) => {

  const [facilities, setFacilities] = useState({
    searchInput: "",
    selected: [] as typeof hotelFacilities,
    searchList: hotelFacilities.filter((facility) =>
      dashboardData.facilities.every((item) => item.label !== facility.label)
    ),
  });

  const searchFavility = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    const searchedList = hotelFacilities.filter((facility) =>
      facility.label.split(" ").some((word) =>
        word.toLowerCase().startsWith(searchInput.toLowerCase())
      ) && !facilities.selected.some((item) => item.label === facility.label)
    );
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      searchInput,
      searchList: searchedList,
    }));
  };

  const selectFacility = (facility: typeof hotelFacilities[0]) => {
    const remainingFacilities = facilities.searchList.filter(
      (item) => item.label !== facility.label
    );
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      selected: [...prevFacilities.selected, facility],
      searchList: remainingFacilities,
    }));
  };

  const deleteFacility = (facility: typeof hotelFacilities[0]) => {
    const remainingFacilities = facilities.selected.filter(
      (item) => item.label !== facility.label
    );
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      selected: remainingFacilities,
      searchList: [...prevFacilities.searchList, facility],
    }));
  };

  const saveFacilities = async () => {
    const resObj = await makeReq("/api/hotel/addFacilities", "POST", {
      facilities: facilities.selected,
    }, userToken!);

    const res = handleResponse(resObj, enqueueSnackbar);

    if (res) {
      enqueueSnackbar("Facilities added successfully", {
        variant: "success"
      });
      setDashboardData((prevState) => ({
        ...prevState,
        facilities: [...prevState.facilities!, ...facilities.selected]
      }));
      setModalState((prevModalState) => ({
        ...prevModalState,
        show: false,
      }));
      return;
    }
    return;

  };

  return (
    <div className={styles.addFacilitiesModalBody}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Search for facilities"
          value={facilities.searchInput}
          onChange={searchFavility}
        />
        <button className="btn btn-primary" onClick={saveFacilities} >Add Facilities</button>
      </div>
      <div className={styles.body}>
        {facilities.selected.length >= 1 && (
          <div className={styles.selectedFacilitiesContainer}>
            <label htmlFor="selectedFacilitiesCollapsible">Selected Facilities</label>
            <input type="checkbox" name="selectedFacilitiesCollapsible" id="selectedFacilitiesCollapsible" className={styles.collapsibleInput} checked />
            <div className={styles.facilities}>
              {facilities.selected.map((facility, index) => (
                <div className={styles.facility} key={index}>
                  <MaterialIcon iconName={facility.icon} />
                  <p title={facility.label}>{facility.label}</p>
                  <button className="btn btn-danger" onClick={() => deleteFacility(facility)} ><MaterialIcon iconName={"delete"} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.searchedResultContainer}>
          <div className={styles.facilities}>
            {facilities.searchList.map((facility, index) => (
              <div className={styles.facility} key={index} onClick={() => selectFacility(facility)} >
                <MaterialIcon iconName={facility.icon} />
                <p title={facility.label}>{facility.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface INewHotelImageProps {
  hotelName: string;
  setDashboardData: Dispatch<SetStateAction<IDashboardState>>;
  userToken: string;
  enqueueSnackbar: (message: SnackbarMessage, options?: SnackbarOptions | undefined) => SnackbarKey;
  setModalState: Dispatch<SetStateAction<IModalState>>;
}

const AddNewHotelImage: FC<INewHotelImageProps> = ({ hotelName, setDashboardData, userToken, enqueueSnackbar, setModalState }) => {
  const [imagesState, setImagesState] = useState<{
    file: File;
    name: string;
    type: string;
    size: number;
  }[]>([]);

  const uploadImgInp = useRef<HTMLInputElement>(null);

  const discardImageFile = (imageFile: File) => {
    setImagesState((prevState) => prevState.filter((f) => f.file !== imageFile));
  };

  const uploadImages = async () => {
    try {
      const firebaseImageURLs: any[] = [];
      for await (const image of imagesState) {
        const firebaseImageFileRef = createRef(`${hotelName}/images/${generateUID(image.name, image.size.toString())}`);
        const firebaseImageURL = await uploadFile(firebaseImageFileRef, image.file);
        firebaseImageURLs.push({
          ref: firebaseImageFileRef.fullPath,
          link: firebaseImageURL,
        });
      }

      const resObj = await makeReq("/api/hotel/addPhoto", "POST", {
        photos: firebaseImageURLs,
      }, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {
        enqueueSnackbar("Images uploaded successfully", {
          variant: "success"
        });
        setImagesState([]);
        setDashboardData((prevState) => ({
          ...prevState,
          hotelImages: [...prevState.hotelImages, ...firebaseImageURLs],
        }));
        setModalState((prevModalState) => ({
          ...prevModalState,
          show: false,
        }));
        return;
      }
      return;

    } catch (error) {
      const err = error as Error;
      enqueueSnackbar(err.message ?? "Error : Please try again later", { variant: "error" });
      return;
    }
  };

  const fileUploadHandler = (files: FileList) => {
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
    setImagesState((prevState) => [...prevState, ...filesArray]);
  };

  return (
    <div
      className={styles.fileModalBody}
      onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        fileUploadHandler(files);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <input
        ref={uploadImgInp}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          const files = e.target.files;
          fileUploadHandler(files!);
          e.target.value = "";
        }}
      />
      <div
        className={styles.fileModalHeader}
        onClick={() => uploadImgInp.current && uploadImgInp.current.click()}
      >
        <h5>Click or drag and drop files here</h5>
        <button
          className="btn btn-info"
          onClick={(e) => {
            uploadImages();
            e.stopPropagation();
          }}
        >
          Upload
        </button>
      </div>
      <div className={styles.fileModalFilesContainer}>
        {imagesState.map((file, index) => (
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
                onClick={(e) => {
                  discardImageFile(file.file);
                  e.stopPropagation();
                }}
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

const ImagePreview: FC<{ imageSrc: string; }> = ({ imageSrc }) => {
  return (
    <div className={styles.imagePreviewBody}>
      <Image
        src={imageSrc}
        layout="fill"
        objectFit="cover"
        alt="Image preview"
      />
    </div>
  );
};

interface IAddNewRoomProps {
  hotelName: string;
  setModalState: Dispatch<SetStateAction<IModalState>>;
  userToken: string;
  enqueueSnackbar: SnackbarType;
  roomData?: IRoomData;
  setDashboardData: Dispatch<SetStateAction<IDashboardState>>;
}

export interface IRoomState {
  newRoomObj: {
    name: string;
    price: string;
    capacity: string;
    description: JSONContent;
    images: {
      file: File;
      name: string;
      type: string;
      size: number;
    }[];
    quantity: string;
  };
  editData?: {
    name: string;
    price: string;
    capacity: string;
    description: JSONContent;
    images: {
      file: File;
      name: string;
      type: string;
      size: number;
    }[];
    quantity: string;
  };
  canEdit: boolean;
  readOnlyData?: IRoomData;
}

const AddNewRoom: FC<IAddNewRoomProps> = ({ hotelName, setModalState, userToken, enqueueSnackbar, roomData, setDashboardData }) => {
  const [roomState, setRoomState] = useState<IRoomState>({
    newRoomObj: {
      name: "",
      price: "",
      capacity: "",
      description: defaultEditorData,
      images: [],
      quantity: "",
    },
    canEdit: false,
    editData: {
      name: roomData?.name ?? "",
      price: roomData?.price.toString() ?? "",
      capacity: roomData?.capacity.toString() ?? "",
      description: roomData?.description ?? defaultEditorData,
      images: [],
      quantity: roomData?.quantity.toString() ?? "",
    },
    readOnlyData: roomData,
  });

  const uploadFileInp = useRef<HTMLInputElement>(null);

  const onDropRoomImage = (files: FileList) => {
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

    const isNew = roomState.readOnlyData === undefined;

    if (isNew) {
      setRoomState((prevState) => ({
        ...prevState,
        newRoomObj: {
          ...prevState.newRoomObj,
          images: [...prevState.newRoomObj.images, ...filesArray],
        },
      }));
    }

    if (!isNew && roomState.canEdit) {
      setRoomState((prevState) => ({
        ...prevState,
        editData: {
          ...prevState.editData!,
          images: [...prevState.editData!.images, ...filesArray],
        },
      }));
    }
  };

  const discardImage = (file: File) => {

    const isNew = roomState.readOnlyData === undefined;

    if (isNew) {
      setRoomState((prevState) => ({
        ...prevState,
        newRoomObj: {
          ...prevState.newRoomObj,
          images: prevState.newRoomObj.images.filter(
            (image) => image.file !== file
          ),
        },
      }));
    }

    if (!isNew && roomState.editData) {
      setRoomState((prevState) => ({
        ...prevState,
        editData: {
          ...prevState.editData!,
          images: prevState.editData!.images.filter(
            (image) => image.file !== file
          ),
        },
      }));
    }

  };

  const editorUpdate = (data: JSONContent) => {
    const isNew = roomState.readOnlyData === undefined;

    if (isNew) {
      setRoomState((prevState) => ({
        ...prevState,
        newRoomObj: {
          ...prevState.newRoomObj,
          description: data,
        },
      }));
    }

    if (!isNew && roomState.editData) {
      setRoomState((prevState) => ({
        ...prevState,
        editData: {
          ...prevState.editData!,
          description: data,
        },
      }));
    }
  };

  const deleteImage = async (imageRef: string) => {
    try {
      const resObj = await makeReq("/api/hotel/deleteRoomImage", "DELETE", {
        imageRef,
        roomId: roomState.readOnlyData?.roomId,
      }, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {

        const fileRef = ref(storage, imageRef);

        await deleteObject(fileRef);

        setRoomState((prevState) => ({
          ...prevState,
          readOnlyData: {
            ...prevState.readOnlyData!,
            images: prevState.readOnlyData!.images.filter((image) => image.ref !== imageRef),
          },
        }));

        setDashboardData((prevState) => ({
          ...prevState,
          rooms: prevState.rooms.map((room) => {
            if (room.roomId === roomState.readOnlyData?.roomId) {
              return res;
            }
            return room;
          }),
        }));

        enqueueSnackbar("Image deleted successfully", {
          variant: "success"
        });

      }
      return;
    } catch (error) {
      const err = error as Error;
      enqueueSnackbar(err.message ?? "Error : Please try again later", { variant: "error" });
      return;
    }
  };

  const addNewRoom = async () => {

    const newRoomState = roomState.newRoomObj;

    try {
      const firebaseImageURLs: any[] = [];
      if (newRoomState.images.length > 0) {
        for await (const image of newRoomState.images) {
          const firebaseImageFileRef = createRef(`${hotelName}/rooms/${newRoomState.name}/images/${generateUID(image.name, image.size.toString())}`);
          const firebaseImageURL = await uploadFile(firebaseImageFileRef, image.file);
          firebaseImageURLs.push({
            ref: firebaseImageFileRef.fullPath,
            link: firebaseImageURL,
          });
        }
      }

      const raw = {
        name: newRoomState.name,
        price: newRoomState.price,
        capacity: newRoomState.capacity,
        description: newRoomState.description,
        images: newRoomState.images.length > 0 ? firebaseImageURLs : undefined,
        quantity: newRoomState.quantity,
      };

      const resObj = await makeReq("/api/hotel/addRoom", "POST", raw, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {
        enqueueSnackbar("New Room added successfully", {
          variant: "success"
        });
        setRoomState((prevState) => ({
          ...prevState,
          newRoomObj: {
            capacity: "",
            description: defaultEditorData,
            images: [],
            name: "",
            price: "",
            quantity: "",
          }
        }));
        setDashboardData((prevState) => ({
          ...prevState,
          rooms: [...prevState.rooms, res]
        }));
        setModalState((prevModalState) => ({
          ...prevModalState,
          show: false,
        }));
      }
      return;

    } catch (error) {
      const err = error as Error;
      enqueueSnackbar(err.message ?? "Error : Please try again later", { variant: "error" });
      return;
    }
  };

  const editRoom = async () => {

    const editRoomState = roomState.editData!;
    const editRoomId = roomState.readOnlyData!.roomId;

    try {
      const firebaseImageURLs: any[] = [];
      if (editRoomState.images.length > 0) {
        for await (const image of editRoomState.images) {
          const firebaseImageFileRef = createRef(`${hotelName}/rooms/${editRoomState.name}/images/${generateUID(image.file.name, image.file.size.toString())}`);
          const firebaseImageURL = await uploadFile(firebaseImageFileRef, image.file);
          firebaseImageURLs.push({
            ref: firebaseImageFileRef.fullPath,
            link: firebaseImageURL,
          });
        }
      }

      const raw = {
        roomId: editRoomId,
        name: editRoomState.name === roomState.readOnlyData?.name ? undefined : editRoomState.name,
        price: editRoomState.price === roomState.readOnlyData?.price.toString() ? undefined : +editRoomState.price,
        capacity: editRoomState.capacity === roomState.readOnlyData?.capacity.toString() ? undefined : +editRoomState.capacity,
        description: editRoomState.description === roomState.readOnlyData?.description ? undefined : editRoomState.description,
        images: editRoomState.images.length > 0 ? [...roomState.readOnlyData!.images, ...firebaseImageURLs] : undefined,
        quantity: editRoomState.quantity === roomState.readOnlyData?.quantity.toString() ? undefined : +editRoomState.quantity,
      };

      const resObj = await makeReq('/api/hotel/editRoom/', "PATCH", raw, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {
        enqueueSnackbar("Room edited successfully", {
          variant: "success"
        });
        setRoomState((prevState) => ({
          ...prevState,
          editData: undefined,
          readOnlyData: res,
        }));
        setDashboardData((prevState) => ({
          ...prevState,
          rooms: prevState.rooms.map((room) => {
            if (room.roomId === editRoomId) {
              return res;
            }
            return room;
          })
        }));
        setModalState((prevModalState) => ({
          ...prevModalState,
          show: false,
        }));
      }
      return;

    } catch (error) {
      const err = error as Error;
      enqueueSnackbar(err.message ?? "Error : Please try again later", { variant: "error" });
      return;
    }

  };

  return (
    <div className={styles.addRoomModalBody}>
      <div
        className={styles.fileModalBody}
        onDrop={(e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          onDropRoomImage(files);
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
              onDropRoomImage(files);
              e.target.value = "";
            }
          }}
        />
        <div
          className={styles.fileModalHeader}
          onClick={() => {
            if (roomState.readOnlyData !== undefined && !roomState.canEdit) return;
            uploadFileInp.current && uploadFileInp.current.click();
          }}
        >

          {roomState.readOnlyData === undefined ? (
            <h5>Click or drag and drop room photos here</h5>
          ) : null}

          {roomState.readOnlyData !== undefined && roomState.readOnlyData.images.length === 0 ? (
            <h5>{roomState.canEdit ? "Click or drag and drop room images here" : "No images added yet turn on Edit to add images"} </h5>
          ) : null}

          {roomState.readOnlyData !== undefined && roomState.canEdit && roomState.readOnlyData.images.length > 0 ? (
            <h5>Click or drag and drop room photos here</h5>
          ) : null}

        </div>
        <div className={styles.fileModalFilesContainer}>
          {roomState.readOnlyData === undefined ? roomState.newRoomObj.images.map((file, index) => (
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
                  onClick={() => discardImage(file.file)}
                >
                  discard
                </button>
              </div>
            </div>
          )) : null}
          {roomState.readOnlyData !== undefined
            && roomState.readOnlyData.images.length >= 1 ?
            roomState.readOnlyData.images.map((image, index) => (
              <div key={index} className={styles.fileModalFile}>
                <div className={styles.fileImageContainer}>
                  <Image
                    src={image.link}
                    layout={"fill"}
                    objectFit={"cover"}
                    alt={image.ref}
                  />
                </div>
                <div className={styles.fileContent}>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteImage(image.ref)}
                  >
                    remove
                  </button>
                </div>
              </div>
            )) : null}

          {roomState.readOnlyData !== undefined &&
            roomState.canEdit &&
            roomState.editData!.images.length >= 1 ?
            roomState.editData!.images.map((file, index) => {
              return (
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
                      onClick={() => discardImage(file.file)}
                    >
                      discard
                    </button>
                  </div>
                </div>
              );
            }) : null}
        </div>
      </div >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (roomState.readOnlyData === undefined) {
            addNewRoom();
          }
          if (roomState.readOnlyData !== undefined && roomState.canEdit) {
            editRoom();
          }
        }}
      >
        <label htmlFor="roomName">Room Name</label>
        <input
          id="roomName"
          type="text"
          placeholder="Room Name : "
          value={roomState.readOnlyData !== undefined ? roomState.editData?.name : roomState.newRoomObj.name}
          onChange={(e) => {
            if (roomState.readOnlyData !== undefined) {
              setRoomState((prevState) => ({
                ...prevState,
                editData: {
                  ...prevState.editData!,
                  name: e.target.value,
                },
              }));
            } else {
              setRoomState((prevState) => ({
                ...prevState,
                newRoomObj: {
                  ...prevState.newRoomObj,
                  name: e.target.value,
                },
              }));
            }
          }}
          readOnly={roomState.readOnlyData !== undefined && !roomState.canEdit}
        />
        <label htmlFor="roomPrice">Room Price</label>
        <input
          id="roomPrice"
          type={"number"}
          placeholder='Room Price : 1000'
          value={roomState.readOnlyData !== undefined ? roomState.editData?.price : roomState.newRoomObj.price}
          onChange={(e) => {
            if (roomState.readOnlyData !== undefined) {
              setRoomState((prevState) => ({
                ...prevState,
                editData: {
                  ...prevState.editData!,
                  price: e.target.value,
                },
              }));
            } else {
              setRoomState((prevState) => ({
                ...prevState,
                newRoomObj: {
                  ...prevState.newRoomObj,
                  price: e.target.value,
                },
              }));
            }
          }}
          readOnly={roomState.readOnlyData !== undefined && !roomState.canEdit}
        />
        <label htmlFor="roomCapacity" >Room Capacity</label>
        <input
          id="roomCapacity"
          type={"number"}
          placeholder="Capacity"
          value={roomState.readOnlyData !== undefined ? roomState.editData?.capacity : roomState.newRoomObj.capacity}
          onChange={(e) => {
            if (roomState.readOnlyData !== undefined) {
              setRoomState((prevState) => ({
                ...prevState,
                editData: {
                  ...prevState.editData!,
                  capacity: e.target.value,
                },
              }));
            } else {
              setRoomState((prevState) => ({
                ...prevState,
                newRoomObj: {
                  ...prevState.newRoomObj,
                  capacity: e.target.value,
                },
              }));
            }
          }}
          readOnly={roomState.readOnlyData !== undefined && !roomState.canEdit}
        />
        <label htmlFor="roomQuantity" >Room Quantity</label>
        <input
          id="roomQuantity"
          type={"number"}
          placeholder="Quantity"
          value={roomState.readOnlyData !== undefined ? roomState.editData?.quantity : roomState.newRoomObj.quantity}
          onChange={(e) => {
            if (roomState.readOnlyData !== undefined) {
              setRoomState((prevState) => ({
                ...prevState,
                editData: {
                  ...prevState.editData!,
                  quantity: e.target.value,
                },
              }));
            } else {
              setRoomState((prevState) => ({
                ...prevState,
                newRoomObj: {
                  ...prevState.newRoomObj,
                  quantity: e.target.value,
                },
              }));
            }
          }}
          readOnly={roomState.readOnlyData !== undefined && !roomState.canEdit}
        />
        <div className={styles.editorContainer}>
          <TiptapEditor
            editable={roomState.readOnlyData === undefined || roomState.canEdit}
            initialData={roomState.readOnlyData !== undefined ? roomState.editData!.description : roomState.newRoomObj.description}
            onUpdate={editorUpdate} />

        </div>
        {roomState.readOnlyData !== undefined && (
          <button
            className="btn"
            type="button"
            onClick={() => {
              if (roomState.readOnlyData !== undefined) {
                setRoomState((prevState) => ({
                  ...prevState,
                  canEdit: !prevState.canEdit,
                }));
              }
            }}
          >
            {roomState.canEdit ? "Cancel" : "Edit"}
          </button>
        )}
        <button
          className="btn"
          // disabled={!roomState.name || !roomState.price || !roomState.capacity}
          type={"submit"}
        >
          {roomState.readOnlyData !== undefined ? "Save" : "Add"}
        </button>
      </form>
    </div >
  );
};

interface IRoomCard {
  roomData: IRoomData;
  onDelete?: () => void;
  onClick?: () => void;
}

const RoomCard: FC<IRoomCard> = ({ roomData, onDelete, onClick }) => {
  const [roomImages, setRoomImages] = useState({
    list: roomData.images,
    currentIndex: 0
  });

  useEffect(() => {
    const imagesInterval = setInterval(() => {
      setRoomImages((prevState) => {
        return {
          ...prevState,
          currentIndex:
            prevState.currentIndex === prevState.list.length - 1
              ? 0
              : prevState.currentIndex + 1
        };
      });
    }, 5000);

    return () => {
      clearInterval(imagesInterval);
    };
  }, []);

  return (
    <div className={styles.roomCard}  >
      <div className={styles.roomImage} onClick={onClick}>
        {roomData.images && roomData.images.length > 0 ? (
          <Image
            src={roomData.images[roomImages.currentIndex].link}
            layout="fill"
            objectFit="cover"
            alt={`${roomData.name}-image`}
          />
        ) : (
          <div className={styles.noImage}>
            <p>No Image</p>
          </div>
        )}
      </div>
      <div className={styles.roomDetails} onClick={onClick}>
        <p>Name : {roomData.name}</p>
        <small>Quantity : {roomData.quantity}</small>
        <p>
          <Rupee /> {roomData.price}
        </p>
      </div>
      <button className="btn btn-danger" onClick={onDelete} >
        <MaterialIcon iconName="delete" />
      </button>
    </div>
  );

};

interface IDashboardProps {
  data: IFullHotelData;
}

interface IDashboardState extends IFullHotelData {
  editFacilities: boolean;
  selectedFacilities: string[];
}

const Dashboard: NextPage<IDashboardProps> = ({ data }) => {

  const [dashboardData, setDashboardData] = useState<IDashboardState>({
    ...data,
    editFacilities: false,
    selectedFacilities: [],
  });

  const userToken = useAppSelector(state => state.user.userEncryptedToken);
  const { enqueueSnackbar } = useSnackbar();

  const [modalState, setModalState] = useState<IModalState>({
    modalHeader: "",
    show: false,
    modalContent: <Fragment />,
  });

  const [hotelDesc, setHotelDesc] = useState({
    editable: false,
    data: data.description,
  });

  const router = useRouter();

  const enableHotelDescEdit = () => {
    setHotelDesc((prevState) => ({
      ...prevState,
      editable: !prevState.editable,
    }));
  };

  const onHotelDescUpdate = (data: JSONContent) => {
    setHotelDesc((prevState) => ({
      ...prevState,
      data,
    }));
  };

  const saveHotelDesc = async () => {

    const resObj = await makeReq("/api/hotel/updateDesc", "PATCH", {
      description: hotelDesc.data,
    }, userToken!);

    const res = handleResponse(resObj, enqueueSnackbar);

    if (res) {

      setHotelDesc((prevState) => ({
        ...prevState,
        editable: false,
      }));
      enqueueSnackbar("Description updated successfully", { variant: "success" });
    }

    return;
  };

  const addFacilityBtn = () => {
    setModalState({
      modalHeader: "Add Facilities",
      show: true,
      modalContent: (
        <AddFacilities dashboardData={dashboardData} setDashboardData={setDashboardData} userToken={userToken!} enqueueSnackbar={enqueueSnackbar} setModalState={setModalState} />
      ),
    });
  };

  const editFacilityBtn = () => {
    setDashboardData((prevState) => ({
      ...prevState,
      editFacilities: !prevState.editFacilities,
    }));
  };

  const selectFacility = (facilityLabel: string) => {
    const isPresent = dashboardData.selectedFacilities.includes(facilityLabel);
    if (isPresent) {
      setDashboardData((prevState) => ({
        ...prevState,
        selectedFacilities: prevState.selectedFacilities.filter(
          (facility) => facility !== facilityLabel
        ),
      }));
    }
    if (!isPresent) {
      setDashboardData((prevState) => ({
        ...prevState,
        selectedFacilities: [...prevState.selectedFacilities, facilityLabel],
      }));
    }
  };

  const deleteFacility = async () => {
    try {
      const resObj = await makeReq("/api/hotel/deleteFacility", "DELETE", {
        facilities: dashboardData.selectedFacilities,
      }, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {
        enqueueSnackbar("Facility deleted successfully", {
          variant: "success"
        });

        setDashboardData((prevState) => ({
          ...prevState,
          facilities: resObj.res.data.facilities,
          selectedFacilities: [],
          editFacilities: false,
        }));
      }
      return;
    } catch (err) {
      enqueueSnackbar("Please try again later", { variant: "error" });
    }
  };

  const deleteImage = async (imageRef: string) => {
    try {
      const resObj = await makeReq("/api/hotel/deletePhoto", "DELETE", {
        imageRef,
      }, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {
        const fileRef = ref(storage, imageRef);

        await deleteObject(fileRef);

        enqueueSnackbar("Image deleted successfully", {
          variant: "success"
        });
        setDashboardData((prevState) => ({
          ...prevState,
          hotelImages: prevState.hotelImages.filter((image) => image.ref !== imageRef),
        }));
      }
      return;
    } catch (error) {
      const err = error as Error;
      enqueueSnackbar(err.message ?? "Error : Please try again later", { variant: "error" });
      return;
    }
  };

  const deleteRoom = async (
    roomId: string,
    roomImages: {
      link: string,
      ref: string,
    }[]
  ) => {
    try {
      const resObj = await makeReq("/api/hotel/deleteRoom", "DELETE", {
        roomId,
      }, userToken!);

      const res = handleResponse(resObj, enqueueSnackbar);

      if (res) {
        roomImages.forEach(async (image) => {
          const fileRef = ref(storage, image.ref);
          await deleteObject(fileRef);
        });
        setDashboardData((prevState) => ({
          ...prevState,
          rooms: resObj.res.data
        }));

        enqueueSnackbar("Room deleted successfully", {
          variant: "success"
        });

      }
      return;
    } catch (error) {
      const err = error as Error;
      enqueueSnackbar(err.message ?? "Error : Please try again later", { variant: "error" });
      return;
    }
  };

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.sectionHeader}>
          <h5>Hotel Information</h5>
        </div>
        <div className={styles.descContainer}>
          <div className={styles.descRowOne}>
            <h3>{data.name}</h3>
            <div className={styles.descDetailContainer}>
              <div className={styles.descDetails}>
                <p>Place : </p>
                <p className={styles.fontDark}>
                  {data.city}, {data.state}
                </p>
              </div>
              <div className={styles.descDetails}>
                <p>Adrress : </p>
                <p className={styles.fontDark}>{data.address}</p>
              </div>
              <div className={styles.descDetails}>
                <p className={styles.fontLight}>Mail : </p>
                <a href={`mailto:${data.email}`}>
                  <p className={styles.fontDark}>{data.email}</p>
                </a>
              </div>
              <div className={styles.descDetails}>
                <p className={styles.fontLight}>Phone : </p>
                <a href={`tel:${data.phone}`}>
                  <p className={styles.fontDark}>{data.phone}</p>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className={styles.descRowTwo}>
            <div className={styles.contentItem}>
              <p>Available Rooms types</p>
              <h5>{dashboardData.rooms.length}</h5>
            </div>
            <div className={styles.contentItem}>
              <p>Ratings</p>
              <small>
                <span>{data.ratingsAverage}</span>
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
          <h5>Hotel Description</h5>
          <div className={styles.btnOptions}>
            <button
              className="btn btn-primary"
              onClick={enableHotelDescEdit}
            >
              {hotelDesc.editable ? "Cancel" : "Edit"}
            </button>
            {hotelDesc.editable && (
              <button
                className="btn btn-success"
                onClick={saveHotelDesc}
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div className={styles.descContainer}>
          <TiptapEditor
            editable={hotelDesc.editable}
            initialData={hotelDesc.data}
            onUpdate={onHotelDescUpdate}
          />
        </div>
        <div className={styles.sectionHeader}>
          <h5>Hotel Facilities</h5>
          <div className={styles.btnOptions}>
            <button
              className="btn btn-primary"
              onClick={addFacilityBtn}
            >
              Add
            </button>
            <button className={`btn ${dashboardData.editFacilities ? "btn-info" : undefined}`} onClick={editFacilityBtn} >
              Edit
            </button>
            {dashboardData.editFacilities && (
              <button className="btn btn-danger" onClick={deleteFacility} disabled={dashboardData.selectedFacilities.length < 1} >
                delete
              </button>
            )}
          </div>
        </div>
        <div className={styles.facilitiesContainer}>
          {dashboardData.facilities.map((facility, i) => {
            return (
              <div
                className={styles.facilityItem}
                key={i}
                onClick={() => {
                  if (dashboardData.editFacilities) selectFacility(facility.label);
                }}
              >
                <h1><MaterialIcon iconName={facility.icon} /></h1>
                <h5 title={facility.label} >{facility.label}</h5>
                {dashboardData.editFacilities && (
                  <button className={`btn btn-info ${styles.selectFacility}  ${dashboardData.selectedFacilities.includes(facility.label) ? styles.selected : undefined}`} >
                    <MaterialIcon iconName="done" />
                  </button>
                )}
              </div>
            );
          })}
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
                  modalContent: (
                    <AddNewHotelImage hotelName={data.name} setDashboardData={setDashboardData} userToken={userToken!} enqueueSnackbar={enqueueSnackbar} setModalState={setModalState} />
                  ),
                });
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className={styles.photosContainer}>
          {dashboardData.hotelImages.map((img, i) => (
            <div
              className={styles.photoCard}
              key={i}
            >
              <Image
                src={img.link}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="hotel"
                onClick={() => {
                  setModalState({
                    modalHeader: "View Photo",
                    show: true,
                    modalContent: <ImagePreview imageSrc={img.link} />,
                  });
                }}
              />
              <button className="btn btn-danger" onClick={() => deleteImage(img.ref)} >
                <MaterialIcon iconName="delete" />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.sectionHeader}>
          <h5>Available rooms</h5>
          <div className={styles.btnOptions}>
            <button
              className="btn"
              onClick={() => {
                setModalState({
                  modalHeader: "Add new room",
                  show: true,
                  modalContent: (
                    <AddNewRoom hotelName={data.name} setModalState={setModalState} userToken={userToken!} enqueueSnackbar={enqueueSnackbar} setDashboardData={setDashboardData} />
                  ),
                });
              }}
            >
              Add Room
            </button>
          </div>
        </div>
        <div className={styles.roomsContainer}>
          {dashboardData.rooms.length >= 1 && dashboardData.rooms.map((roomData, index) => (
            <RoomCard
              key={index}
              roomData={roomData}
              onDelete={() => deleteRoom(roomData.roomId, roomData.images)}
              onClick={() => {
                setModalState({
                  modalHeader: "View or Edit room",
                  show: true,
                  modalContent: (
                    <AddNewRoom hotelName={data.name} setModalState={setModalState} userToken={userToken!} enqueueSnackbar={enqueueSnackbar} roomData={roomData} setDashboardData={setDashboardData} />
                  ),
                });
              }} />
          ))}
        </div>
        <div className={styles.sectionHeader}>
          <h5>Bookings</h5>
          <div className={styles.btnOptions}>
            <button className="btn" onClick={() => router.push("/bookings")}>
              View
            </button>
          </div>
        </div>
        <table className={styles.bookingsTable}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer Name</th>
              <th>Room Type</th>
              <th>Check In Date</th>
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
                  <td>
                    <button className="btn btn-secondary" >View</button>
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
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const token = getTokenCookie(ctx);
  const userToken = parseJWT(token);

  if (!userToken || userToken.role !== "HOTEL") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { slug } = userToken;

  const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/${slug}`, "GET");

  if (!resObj || resObj.error || (resObj.response && !resObj.response.ok)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: resObj.res.data,
    },
  };
};
