import React, { useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import copy from "copy-to-clipboard";
import HideShow from "./hide-show";
import { SplitSentence } from "utils/paraphraser/split-sentence";
import Sentence from "./Sentence";
import { useIntl } from "react-intl";
import SampleText from "./sample-text";

export default function Paraphraser() {
  const intl = useIntl();
  const [paraphraseMode, setParaphraseMode] = useState("stable");
  const [inputText, setInputText] = useState("");
  const [outputData, setOutputData] = useState<string[][]>([]);
  const [paraphraseLoading, setParaphraseLoading] = useState(false);
  const disabled = useMemo(
    () => inputText.length <= 0 || inputText.length > 2000 || paraphraseLoading,
    [inputText, paraphraseLoading]
  );
  const inputTextRef = useRef(null);
  const minToken = 32;
  const maxToken = 256;
  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleParaphraseSubmission = () => {
    setParaphraseLoading(true);
    const loadingToast = toast.loading("Ag obair air...");
    Promise.all(
      SplitSentence(inputText, minToken, maxToken).map((text) => {
        const models = {
          dev: new URL(`https://angocair.garg.ed.ac.uk/fast/`),
          stable: new URL(`https://angocair.garg.ed.ac.uk/best/`),
        };
        const url = models[paraphraseMode];
        url.searchParams.append("text", text);
        return fetch(url.toString()).then((res) => {
          if (res && res.ok) {
            return res.json().then((content) => {
              if (content.text[0] === "\n") {
                return content.text as string[];
              } else {
                return content.data as string[];
              }
            });
          }
          return Promise.reject();
        });
      })
    )
      .then(
        (datas) => {
          setOutputData(datas);
          toast.success("");
        },
        (_) => {
          toast.error(
            "Dh’èirich duilgheadas ris nach robh dùil. Nach fheuch thu ris a-rithist an ceann greis?"
          );
        }
      )
      .finally(() => {
        toast.dismiss(loadingToast);
        setParaphraseLoading(false);
        setOutputEditable();
      });
  };

  const setOutputEditable = () => {
    var div = document.getElementById("outputText");
    div.contentEditable = "true";
  };
  const handleCopyResult = () => {
    var div = document.getElementById("outputText");
    var spans = div.getElementsByTagName("span");
    var text = "";
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      if (span.innerHTML === "<br>") {
        text += "\n";
      } else {
        text += span.innerHTML;
      }
    }
    copy(text);
    toast.success("Chaidh lethbhreac dhen toradh a chur air an stòr-bhòrd.");
  };

  const handleClear = () => {
    setInputText("");
    setOutputData([[]]);
    toast.success("Chaidh an t-susbaint fhalamhachadh.");
  };

  const clearlinebreak = () => {
    // var inputText = (document.getElementById("inputText") as HTMLInputElement).value;
    var changedinputText = inputText.replace("¬\n", "");
    changedinputText = changedinputText.replace(/\n/g, " ");
    setInputText(changedinputText.replace(/  +/g, " "));
  };
  const loadSample = () => {
    setInputText(SampleText);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          className: "bg-gray-50 shadow-sm font-medium",
        }}
      />
      <main>
        <section className="py-4 mx-auto max-w-7xl sm:px-6 lg:px-4">
          <div className="flex items-center justify-center">
            <button
              className={`inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none text-gray-500 hover:text-blue-600 focus:text-blue-600 ${
                paraphraseMode === "dev" ? "bg-blue-50 text-blue-700" : ""
              }`}
              onClick={() => setParaphraseMode("dev")}
            >
              {intl.formatMessage({ id: "model1" })}
            </button>
            <button
              className={`inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none text-gray-500 hover:text-green-600 focus:text-green-600 ${
                paraphraseMode === "stable" ? "bg-green-50 text-green-700" : ""
              }`}
              onClick={() => setParaphraseMode("stable")}
            >
              {intl.formatMessage({ id: "model2" })}
            </button>
          </div>
          <HideShow show={paraphraseMode === "dev"}>
            <div className="p-2 mt-2 font-semibold text-center text-blue-700 rounded-lg bg-blue-50">
              {intl.formatMessage({ id: "model1_desc" })}
            </div>
          </HideShow>
          <HideShow show={paraphraseMode === "stable"}>
            <div className="p-2 mt-2 font-semibold text-center text-green-700 rounded-lg bg-green-50">
              {intl.formatMessage({ id: "model2_desc" })}
            </div>
          </HideShow>
          <div className="p-4 sm:px-0">
            <div className="grid grid-cols-2 gap-x-1">
              <label htmlFor="inputText">
                <span className="block pb-2 text-center text-gray-600 md:hidden">
                  Text to normalise
                </span>
                <span className="hidden pb-2 text-center text-gray-600 md:block">
                  {intl.formatMessage({ id: "inputHeader" })}
                </span>
                <textarea
                  id="inputarea"
                  name="inputText"
                  className="block w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-96 disabled:opacity-60 sm:text-sm md:text-lg focus:outline-none focus:ring focus:border-blue-600"
                  placeholder=""
                  value={inputText}
                  onChange={handleInputTextChange}
                  disabled={paraphraseLoading}
                  ref={inputTextRef}
                ></textarea>
              </label>
              <label htmlFor="outputText">
                <span className="block pb-2 text-center text-gray-600">
                  {intl.formatMessage({ id: "outputHeader" })}
                </span>
                <div
                  id="outputText"
                  className="block w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-96 disabled:opacity-60 sm:text-sm md:text-lg focus:outline-none focus:ring focus:border-blue-600 overflow-y:scroll"
                  style={{ overflowY: "scroll" }}
                >
                  {outputData.map((texts, i) => (
                    <Sentence key={i} texts={texts} />
                  ))}
                </div>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex order-1 md:order-1">
              <span
                className={`font-medium ${
                  inputText.length > 2000 ? "text-red-600" : "text-green-600"
                }`}
              >
                {inputText.length}
              </span>
              <span className="text-gray-500">/2000 </span>
              <span
                className={` block font-medium ${
                  inputText.length > 2000 ? "text-blue-500" : "hidden"
                }`}
              >
                <a href="mailto:garg@ed.ac.uk">
                  Contact us to get more than 2000 characters.
                </a>
              </span>
            </div>
            <div className="flex flex-wrap order-3 md:order-2 items-center justify-center">
              <button
                type="button"
                className="flex justify-content:space-between items-center justify-center max-w-md my-2 px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50"
                id="inputText123"
                onClick={clearlinebreak}
              >
                <svg
                  className="w-5 h-6 mr-2 -ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Clear line breaks</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1\
    8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                Remove line breaks
              </button>
              <button
                type="button"
                className="flex justify-content:space-between items-center justify-center max-w-md px-4 mx-2 my-2 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50"
                onClick={loadSample}
              >
                <svg
                  className="w-5 h-6 mr-2 -ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Example</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1\
    8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                {intl.formatMessage({ id: "example" })}
              </button>
              <button
                type="button"
                className="flex items-center justify-center max-w-md my-2 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md disabled:opacity-60 mx-2 px-7 hover:bg-blue-700 md:py-3 md:text-lg md:px-10"
                onClick={handleParaphraseSubmission}
                disabled={disabled}
              >
                {paraphraseLoading ? (
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx={12}
                      cy={12}
                      r={10}
                      stroke="currentColor"
                      strokeWidth={4}
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 mr-2 -ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                )}
                {paraphraseLoading
                  ? intl.formatMessage({ id: "actioning" })
                  : intl.formatMessage({ id: "action" })}
              </button>
            </div>
            <div className="flex order-2 md:order-3 justify-center align-middle">
              <HideShow show={inputText.length > 10 && inputText.length < 2000}>
                <button
                  type="button"
                  className="flex items-center justify-center max-w-md px-4 py-2 mx-2 font-medium text-red-500 border border-transparent rounded-md hover:text-red-600 focus:text-red-600 bg-red-50"
                  onClick={handleClear}
                >
                  <svg
                    className="w-6 h-6 mr-2 -ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Clear all</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  {intl.formatMessage({ id: "clear" })}
                </button>
              </HideShow>
              <HideShow show={true}>
                <button
                  type="button"
                  className="flex items-center justify-center max-w-md px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50"
                  onClick={handleCopyResult}
                >
                  <svg
                    className="w-6 h-6 mr-2 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <title>Copy result</title>
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                  {intl.formatMessage({ id: "copy" })}
                </button>
              </HideShow>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
