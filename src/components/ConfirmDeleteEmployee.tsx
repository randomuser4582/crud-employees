import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    isDialogOpen: boolean;
    handlerConfirmDialog: () => void;
    handlerCancelDialog: () => void;
}
export default function ConfirmDeleteEmployee(props: Props): JSX.Element {
    const { isDialogOpen, handlerConfirmDialog, handlerCancelDialog } = props;
    return (
        <div>
        <Dialog open={isDialogOpen} onClose={handlerCancelDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete employee</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure that you want to delete this employee?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handlerCancelDialog} color="primary">
                Cancel
            </Button>
            <Button onClick={handlerConfirmDialog} color="primary">
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
