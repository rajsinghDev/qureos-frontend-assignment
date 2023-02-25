import Filters from "../../components/Filters";
import { useMemo } from "react";
import { dummyData } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";

type DummyDataType = {
  Bedrooms: string;
  beds: string;
  Bathrooms: string;
  PropertyType: string;
};

const FilterPage = () => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const filters = useMemo(() => {
    let data: { [key in keyof DummyDataType]: string | undefined } = {
      Bedrooms: (params.get("Bedrooms") as string) || "Any",
      beds: (params.get("Beds") as string) || "Any",
      Bathrooms: (params.get("Bathrooms") as string) || "Any",
      PropertyType: params.get("PropertyType") as string,
    };
    return data;
  }, [searchParams]);

  const filterData = useMemo(() => {
    let data = dummyData.filter((item) => {
      return Object.keys(filters).every((key) => {
        return (
          (key !== "PropertyType" &&
            filters[key as keyof DummyDataType] === "Any") ||
          filters[key as keyof DummyDataType] ===
            item[key as keyof DummyDataType] ||
          (key !== "PropertyType" &&
            Number(item[key as keyof DummyDataType]) > 8) ||
          window?.location.search === ("" || "?PropertyType=null")
        );
      });
    });
    return data;
  }, [searchParams]);

  const renderTableCheck = useMemo(() => {
    let check =
      (window?.location.search === "" ||
        window?.location.search === "?PropertyType=" ||
        window?.location.search === "?Bathrooms=Any") &&
      filterData.length === 0;
    return check;
  }, [filterData, window?.location.search]);

  const recordCount = useMemo(() => {
    if (renderTableCheck) return dummyData.length;
    else {
      return filterData.length;
    }
  }, [filterData]);

  return (
    <>
      <div className="px-6 sm:px-6 lg:px-8 py-20">
        <div className="sm:flex sm:items-center justify-end">
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Filters recordCount={recordCount} />
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Bathrooms
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Bedrooms
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Beds
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Property Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {(renderTableCheck ? dummyData : filterData).map(
                      (item, index) => (
                        <tr key={`item-${index}`}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {item.Bathrooms}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.Bedrooms}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.beds}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.PropertyType}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                {!renderTableCheck ? (
                  <div className="text-center py-4">No data found!</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
