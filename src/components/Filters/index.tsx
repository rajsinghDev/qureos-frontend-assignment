import React, { useState } from "react";
import { AdjustmentsIcon, XIcon } from "@heroicons/react/solid";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import PropertyType from "../FilterType/PropertyType";
import UnitScale from "../FilterType";

interface Props {
  recordCount: number;
}

const Filters: React.FC<Props> = ({ recordCount = 0 }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        className="flex border rounded-md px-3.5 py-2 border-gray-300"
        onClick={handleOpen}
      >
        <span className="font-medium text-gray-700 mr-1 text">Filters</span>
        <span className="text-gray-500">
          <AdjustmentsIcon className="text-gray-400 w-5" />
        </span>
      </button>
      <Modal
        className="max-w-3xl"
        dialogClass="overflow-y-hidden"
        open={open}
        overlayClass="bg-black bg-opacity-80"
        restrainWidth={false}
        setOpen={setOpen}
        zeroPadding
      >
        <div className="bg-white rounded-lg p-2 container flex flex-col max-h-screen sm:min-w-[478px]">
          <div className="px-4 py-3 border-b">
            <p className="text-lg leading-6 font-medium relative">
              <button
                className="absolute left-0 top-0 p-0 border-0 h-auto"
                onClick={handleClose}
              >
                <XIcon className="text-gray-500 w-5" />
              </button>
              Filters
            </p>
          </div>
          <div className="px-4 pb-4 flex-1 overflow-y-auto">
            <div className="font-semibold my-4 text-xl text-start">
              Rooms and Beds
            </div>
            <div className="flex flex-col gap-3 border-b pb-8">
              <UnitScale title={"Bedrooms"} />
              <UnitScale title={"Beds"} />
              <UnitScale title={"Bathrooms"} />
            </div>
            <div>
              <PropertyType />
            </div>
          </div>
          <div className="px-4 py-3 border-t">
            <div className="px-3  flex justify-between">
              <button
                className="rounded-md text-blackHeading font-medium leading-5 text-sm underline"
                onClick={() => {
                  navigate("/");
                }}
              >
                Clear All
              </button>
              <button
                className="rounded-lg font-medium bg-gray-800 px-4 leading-5 text-sm p-2 text-white disabled:border-bg-gray-700 min-w-[100px] flex justify-center"
                onClick={handleClose}
              >
                {recordCount ? `Show ${recordCount} Homes` : "Show 0 Homes"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};
export default Filters;
