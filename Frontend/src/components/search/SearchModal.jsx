import { ChemistAPI } from "../../api/chemist";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import searchSvg from "../../assets/images/chemist/search.svg";
import loadingSvg from "../../assets/svg/loading-ring.svg";

import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

SearchModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default function SearchModal({ isOpen, closeModal }) {
  const [showSpinner, setshowSpinner] = useState(false);
  const [search_text, set_search_text] = useState("");
  const [search_results, set_search_results] = useState([]);
  const navigate = useNavigate();

  async function getSearch(search) {
    try {
      setshowSpinner(true);
      const search_results = await ChemistAPI.searchQuery(search);
      console.log(search_results);
      set_search_results(search_results);
      setshowSpinner(false);
    } catch (error) {
      console.log(error);
      setshowSpinner(false);
    }
  }

  function openProduct(item) {
    console.log(item[0], item[1], item[2]);
    if (item[2] == "medicine") {
      navigate(`/chemist/2/medicines/${item[0]}`);
    } else {
      navigate(`/chemist/${item[0]}/`);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getSearch(search_text);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [search_text]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[999999]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex">
                    <input
                      onChange={(el) => set_search_text(el.target.value)}
                      className="ml-4 w-full outline-none bg-transparent text-[#76797A]"
                      type="text"
                      placeholder="Search"
                    />
                    <div className="bg-[#fd7603] rounded  p-2">
                      <img src={searchSvg} alt="search" />
                    </div>
                  </div>

                  {search_results.length > 0 ? (
                    <div className="overflow-y-auto max-h-72 mt-4">
                      <ul className="divide-y divide-gray-100">
                        {search_results.map((item, index) => {
                          return (
                            <li
                              className="px-4 py-4 rounded cursor-pointer hover:bg-orange-100"
                              key={index}
                              onClick={() => openProduct(item)}
                            >
                              {item[1]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <>
                      {showSpinner ? (
                        <div className="flex justify-center text-gray-400 p-10">
                          <img src={loadingSvg} alt="loadingSvg" />
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : (
                        <>
                          {search_text && (
                            <p className="p-10 text-lg text-center text-gray-400">
                              No results ...
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
