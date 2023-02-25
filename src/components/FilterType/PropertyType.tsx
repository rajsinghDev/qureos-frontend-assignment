import clsx from "clsx";
import { useState, useEffect } from "react";
import { PropertyItems } from "./PropertyItems";
import { useSearchParams } from "react-router-dom";

const PropertyType = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [selected, setSelected] = useState<string>(
    (params.get("PropertyType") as string) || ""
  );

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    params["PropertyType"] = selected;
    const newSearch = new URLSearchParams(params).toString();
    setSearchParams(newSearch);
  }, [selected]);

  useEffect(() => {
    if ((params.get("PropertyType") as string) === null || undefined)
      setSelected("");
  }, [searchParams]);

  return (
    <>
      <div className="flex justify-start font-medium text-xl my-4 ">
        Property Type
      </div>
      <div className="grid grid-cols-3 md:flex justify-between gap-x-3 gap-y-2 ">
        {PropertyItems.map((property) => (
          <div
            key={property.label}
            onClick={() => {
              setSelected(String(property.label));
            }}
            className={clsx(
              {
                "bg-gray-800 text-white": selected === String(property.label),
                "bg-white  border-2 border-gray-200 text-gray-700":
                  selected !== String(property.label),
              },
              "p-2 relative w-full overflow-hidden text-center rounded-xl cursor-pointer text-sm font-medium flex items-center  "
            )}
          >
            <div className="flex flex-col gap-y-4 justify-start">
              <span>{property.icon}</span>
              <span>{property.label}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PropertyType;
