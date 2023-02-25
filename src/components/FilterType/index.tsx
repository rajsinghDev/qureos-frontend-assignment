import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  title: string;
};

const UnitScale: React.FC<Props> = ({ title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const setDefaultValue = useMemo(() => {
    let value = "";
    if (title === "Beds") value = params.get("Beds") as string;
    else if (title === "Bedrooms") value = params.get("Bedrooms") as string;
    else if (title === "Bathrooms") value = params.get("Bathrooms") as string;
    else if (value === null || undefined) value = "Any";
    return value;
  }, [searchParams]);
  const [selected, setSelected] = useState<string>(setDefaultValue || "Any");
  const commonStyle =
    "px-6 py-2 relative  border-2 overflow-hidden text-center rounded-full cursor-pointer text-xs font-medium flex items-center justify-center ";

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    params[title] = selected;
    const newSearch = new URLSearchParams(params).toString();
    setSearchParams(newSearch);
  }, [selected]);

  useEffect(() => {
    if (setDefaultValue === null || undefined) setSelected("Any");
  }, [searchParams]);

  return (
    <>
      <div className="flex justify-start font-medium pb-2">{title}</div>
      <div className="flex flex-wrap gap-2">
        <div
          onClick={() => {
            setSelected("Any");
          }}
          className={clsx(
            {
              "bg-gray-800 text-white": selected === "Any",
              "bg-white border-gray-200 text-gray-700": selected !== "Any",
            },
            commonStyle
          )}
        >
          Any
        </div>
        {Array(7)
          .fill(0)
          .map((val, i) => (
            <div
              key={i + 1}
              onClick={() => {
                setSelected(String(i + 1));
              }}
              className={clsx(
                {
                  "bg-gray-800 text-white": selected === String(i + 1),
                  "bg-white  border-gray-200 text-gray-700":
                    selected !== String(i + 1),
                },
                commonStyle
              )}
            >
              {i + 1}
            </div>
          ))}

        <div
          onClick={() => {
            setSelected("more");
          }}
          className={clsx(
            {
              "bg-gray-800 text-white": selected === "more",
              "bg-white  border-gray-200 text-gray-700": selected !== "more",
            },
            commonStyle
          )}
        >
          8+
        </div>
      </div>
    </>
  );
};

export default UnitScale;
