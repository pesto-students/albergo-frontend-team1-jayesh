import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { AlertStateType } from "../../Utils/Helper";

const MUIToast = ({
    alertState,
    setAlertState
}: {
    alertState: AlertStateType;
    setAlertState: Dispatch<SetStateAction<AlertStateType>>;
}) => {

    function closeToast(
        event: Event | SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason
    ) {
        setAlertState({
            visible: false,
            severity: "info",
            message: "",
        });
    }

    return (
        <Snackbar
            open={alertState.visible}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            autoHideDuration={5000}
            onClose={closeToast}
        >
            <Alert onClose={closeToast} severity={alertState.severity}>
                {alertState.message}
            </Alert>
        </Snackbar>
    );
};

export default MUIToast;