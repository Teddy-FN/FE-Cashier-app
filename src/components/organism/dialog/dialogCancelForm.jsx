/* eslint-disable react/prop-types */
import React from "react";

// Components
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../../ui/dialog";

const DialogCancelForm = ({ classNameButtonTrigger, handleBack }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={classNameButtonTrigger}>Cancel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apakah Anda Ingin Membatalkan Ini</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleBack}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCancelForm;
