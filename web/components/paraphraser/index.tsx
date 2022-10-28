import React, { useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard'
import HideShow from '@/components/HideShow';
import { splitSentence } from 'utils';
import Sentence from './Sentence';
import { IntlProvider, FormattedMessage } from "react-intl";


export default function Paraphraser() {
  const [locale, setLocale] = useState("en");
  const [paraphraseMode, setParaphraseMode] = useState("stable");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [outputData, setOutputData] = useState([[]]);
  const [paraphraseLoading, setParaphraseLoading] = useState(false);
  const disabled = useMemo(() => inputText.length <= 0 || inputText.length > 500 || paraphraseLoading, [inputText, paraphraseLoading])
  const inputTextRef = useRef(null);
  const minToken = 32;
  const maxToken = 128;
  const handleInputTextChange = (e) => {
    setInputText(e.target.value)
  };
  const messages = {
    en: {
      headtitle: "An Gocair: Gaelic Standardiser",
      smallmodel: "Small Model",
      stablemodel: "Stable Model",
      developingmodel: "Developing Model",
      inputHeader: "Enter the text you want to GOCify",
      outputHeader: "GOCified text",
      example: "Example",
      action: "Convert to GOC",
      actioning: "Converting to GOC",
      clear: "Clear all",
      copy: "Copy result",
      paraphrasing: "Working on it...",
      clearsuccess: "Successfully cleared content.",
      copysuccess: "Successfully copied to clipboard.",
      errormessage: "Something went wrong. Please try again later.",
      feedback: "Contact us to increase your character limit."
    },
    gd: {
      headtitle: "An GOCair",
      smallmodel: "Am modail beag",
      stablemodel: "Am modail seasmhach",
      developingmodel: "Am modail fo obair",
      inputHeader: "Cuir a-steach na tha thu ag iarraidh ann an litreachadh GOC",
      outputHeader: "An teacsa ann an GOC",
      example: "Ball-eisimpleir",
      action: "Cuir GOC air",
      actioning: "Cuir GOC air",
      clear: "Falamhaich",
      copy: "Lethbhreac",
      paraphrasing: "Ag obair air...",
      clearsuccess: "Chaidh an t-susbaint fhalamhachadh.",
      copysuccess: "Chaidh lethbhreac dhen toradh a chur air an stòr-bhòrd.",
      errormessage: "Dh’èirich duilgheadas ris nach robh dùil. Nach fheuch thu ris a-rithist an ceann greis",
      feedback: "Cuir fios thugainn airson crìoch litrichean nas àirde."
    }
  };


  const handleParaphraseSubmission = () => {
    setParaphraseLoading(true);
    const loadingToast = toast.loading('Paraphrasing...');
    Promise.all(splitSentence(inputText, minToken, maxToken)
    .map(text => {
      console.log(text);
      if (paraphraseMode === "small") {
        const url = new URL(`http://178.62.196.197:8000/paraphrase`);
        url.searchParams.append('text', text);
        return fetch(url.toString())
          .then(res => {
          if (res && res.ok) {
            return res.json().then(content => {
              if (content.text[0] === "\n"){
                  return content.text as string[];
              }
              else {
                  return content.data as string[];
              }
            })
          }
          return Promise.reject();
          })
      }
      else if(paraphraseMode === "stable"){
        const url = new URL(`http://api.hate.codes:8000/paraphrase`);
        url.searchParams.append('text', text);
        return fetch(url.toString())
          .then(res => {
          if (res && res.ok) {
            return res.json().then(content => {
              if (content.text[0] === "\n"){
                  return content.text as string[];
              }
              else {
                  return content.data as string[];
              }
            })
          }
          return Promise.reject();
          })
      } else {
        const url = new URL(`https://c8c8-192-41-104-32.ngrok.io/paraphrase`);
        url.searchParams.append('text', text);
        return fetch(url.toString(),{method: "get", headers: new Headers({"ngrok-skip-browser-warning": "69420",})})
          .then(res => {
          if (res && res.ok) {
            return res.json().then(content => {
              if (content.text[0] === "\n"){
                  return content.text as string[];
              }
              else {
                  return content.data as string[];
              }
            })
          }
          return Promise.reject();
          })
      }

    }))
      .then((datas) => {
	setOutputData(datas);
        toast.success("Successfully paraphrased. Enjoy!");
      }, _ => {
        toast.error('We ran into an issue when trying to paraphrase. Please try again later.');
      }).finally(() => {
        toast.dismiss(loadingToast);
        setParaphraseLoading(false);
	setOutputEditable();
      })

  }

  const setOutputEditable = () => {
    var div = document.getElementById("outputText");
    div.contentEditable = 'true';
  }
  const handleCopyResult = () => {
    var div = document.getElementById("outputText");
    var spans = div.getElementsByTagName("span");
    var text = ""
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      if (span.innerHTML === '<br>') {text += "\n"} else{text += span.innerHTML;}
   }
    copy(text);
    toast.success('Copied result in your clipboard. Enjoy!');
  }

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    toast.success('Successfully cleared content.');
  }

  const clearlinebreak = () => {
    // var inputText = (document.getElementById("inputText") as HTMLInputElement).value;
    var changedinputText = inputText.replace('¬\n', '');
    changedinputText = changedinputText.replace(/\n/g, ' ');
    setInputText(changedinputText);
  }
  const loadSameple = () => {
    var text = "here the text that you want to input.";
    var array = ["Cha'n 'eil mi 'fuirach 'nam thigh mór an-seo ann an Éirinn, gu mi-fhortanach, ach siod a' cheud tigh a bh' agam-sa",
    	      	"bhu ad a fuireach ann an Inhbir-Nìs an uar sen.",
		"Luchd-reic Charbad, Acuinn agus Thruncaichean.",
		"Tha ar prisean iosal, agus tha 'm bathar dhe'n t-seorsa 's fhearr.",
		"Thòisich leann-dubh air buaidh fhaotainn air Màiri bhochd.",
		"TD MU DHAOINE GHEIBH BOGADH BATHAIDH, ATH-BHEOTHACHADH.",
		"'S é 'n duine nuadh a theirear ris an nuadh chreatuir so,",
		"Tha an cogadh a sior dhol air adhart ann an Cuba.",
		"Cha robh esan a' dol na bu mhiosa; cha robh sìon na b' fheàrr. Dh'fhalbh i seo far a robh an sagart. Dh'innis an sagart gu feumadh ise a' chlann a chur do home. Cha robh rathad aice a bhith beò mar siod. Dh'fheumadh i feuchainn ri rud-eigin a chosnadh dhi fhéin."]
    var randomtext = array[Math.floor(Math.random() * array.length)];
    //document.querySelector('textarea').value = randomtext;
    setInputText(randomtext);
  }

  return (
  <>
    <Toaster
      toastOptions={{
        className: 'bg-gray-50 shadow-sm font-medium'
      }}
    />
    
    <select onChange={(e) => setLocale(e.target.value)} defaultValue={locale}>
      <option value="en">English</option>
      <option value="gd">Gaelic</option>
    </select>
    <header className="bg-white">
    <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
    />
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold leading-tight text-center text-gray-900">
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="headtitle"></FormattedMessage>
                </IntlProvider>
        </h1>
      </div>
    </header>
    <main>

    <div className="share-btn-container">
      <a href="#" className="facebook-btn">
        <i className="fab fa-facebook"></i>
      </a>

      <a href="#" className="twitter-btn">
        <i className="fab fa-twitter"></i>
      </a>

      <a href="#" className="pinterest-btn">
        <i className="fab fa-pinterest"></i>
      </a>

      <a href="#" className="linkedin-btn">
        <i className="fab fa-linkedin"></i>
      </a>

      <a href="#" className="whatsapp-btn">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
   <script src="main.js"></script>
      <section className="py-4 mx-auto border border-gray-100 rounded-lg shadow-sm max-w-7xl sm:px-6 lg:px-4">
        <div className="flex items-center justify-center">
          <button className={`inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none text-gray-500 hover:text-blue-600 focus:text-blue-600 ${paraphraseMode === 'small' ? 'bg-blue-50 text-blue-700' : ''}`} onClick={() => setParaphraseMode("small")}>
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="smallmodel"></FormattedMessage>
                </IntlProvider>
          </button>
          <button className={`inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none text-gray-500 hover:text-green-600 focus:text-green-600 ${paraphraseMode === 'stable' ? 'bg-green-50 text-green-700' : ''}`} onClick={() => setParaphraseMode("stable")}>
		<IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="stablemodel"></FormattedMessage>
                </IntlProvider>
	  </button>
          <button className={`inline-block rounded-lg font-medium leading-none py-2 px-3 focus:outline-none text-gray-500 hover:text-amber-600 focus:text-amber-600 ${paraphraseMode === 'latest' ? 'bg-amber-50 text-amber-700' : ''}`} onClick={() => setParaphraseMode("latest")}>
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="developingmodel"></FormattedMessage>
                </IntlProvider>
	  </button>
        </div>
        <HideShow show={paraphraseMode === 'small'}>
          <div className="p-2 mt-2 font-semibold text-center text-blue-700 rounded-lg bg-blue-50">
            8 MB model provide the fastest response time. However, it is not as accurate as the other two models.
          </div>
        </HideShow>
        <HideShow show={paraphraseMode === 'stable'}>
          <div className="p-2 mt-2 font-semibold text-center text-green-700 rounded-lg bg-green-50">
            Stable model is the best model for now. It is the most accurate model.
          </div>
        </HideShow>
        <HideShow show={paraphraseMode === 'latest'}>
          <div className="p-2 mt-2 font-semibold text-center rounded-lg bg-amber-50 text-amber-700">
            Developing model has the largest datasets. It is still trouble shooting. [20221027].
          </div>
        </HideShow>
        <div className="p-4 sm:px-0">
          <div className="grid grid-cols-2 gap-x-1">
            <label htmlFor="inputText">
              <span className="block pb-2 text-center text-gray-600 md:hidden">
                Text to normalise
              </span>
              <span className="hidden pb-2 text-center text-gray-600 md:block">
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="inputHeader"></FormattedMessage>
                </IntlProvider>
              </span>
              <textarea name="inputText" className="block w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-96 disabled:opacity-60 sm:text-sm md:text-lg focus:outline-none focus:ring focus:border-blue-600" placeholder="Cha'n 'eil mi 'fuirach 'nam thigh mór an-seo ann an Éirinn, gu mi-fhortanach, ach siod a' cheud tigh a bh' agam-sa" value={inputText} onChange={handleInputTextChange} disabled={paraphraseLoading} ref={inputTextRef}></textarea>
            </label>
            <label htmlFor="outputText">
              <span className="block pb-2 text-center text-gray-600">
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="outputHeader"></FormattedMessage>
                </IntlProvider>
              </span>
              <div id="outputText" className="block w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-96 disabled:opacity-60 sm:text-sm md:text-lg focus:outline-none focus:ring focus:border-blue-600 overflow-y:scroll" style={{overflowY: 'scroll'}}>
                {outputData.map((texts, i) => <Sentence key={i} texts={texts} />)}
              </div>
            </label>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0">
            <span className={`font-medium ${inputText.length > 500 ? 'text-red-600' : 'text-green-600'}`}>{inputText.length}</span><span className="text-gray-500">/500 </span>
            <span className={` block font-medium ${inputText.length > 500 ? 'text-blue-500' : 'hidden'}`}><a href="mailto:amitgaur.web@gmail.com">Contact us to get more than 500 characters.</a></span>
          </div>
          <button type="button" className="flex justify-content:space-between items-center justify-center max-w-md px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50" id="inputText123" onClick={clearlinebreak}>
                <svg className="w-5 h-6 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title>Clear line breaks</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1\
 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
		remove line breaks
          </button>
          <button type="button" className="flex justify-content:space-between items-center justify-center max-w-md px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50" onClick={loadSameple}>
                <svg className="w-5 h-6 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title>Example</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1\
 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="example"></FormattedMessage>
                </IntlProvider>
          </button>
          <button type="button" className="flex items-center justify-center max-w-md py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md disabled:opacity-60 px-7 hover:bg-blue-700 md:py-3 md:text-lg md:px-10" onClick={handleParaphraseSubmission} disabled={disabled}>
            {paraphraseLoading ? (<svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>) : (<svg className="w-6 h-6 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>)}
{paraphraseLoading ? 
<IntlProvider locale={locale} messages={messages[locale]}><FormattedMessage id="actioning"></FormattedMessage></IntlProvider> : <IntlProvider locale={locale} messages={messages[locale]}><FormattedMessage id="action"></FormattedMessage></IntlProvider> }
          </button>
          <div className="absolute right-0 flex justify-center align-middle">
            <HideShow show={inputText.length > 10 && inputText.length < 500}>
              <button type="button" className="flex items-center justify-center max-w-md px-4 py-2 mx-2 font-medium text-red-500 border border-transparent rounded-md hover:text-red-600 focus:text-red-600 bg-red-50" onClick={handleClear}>
                <svg className="w-6 h-6 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title>Clear all</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="clear"></FormattedMessage>
                </IntlProvider>
              </button>
            </HideShow>
            <HideShow show={true}>
              <button type="button" className="flex items-center justify-center max-w-md px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50" onClick={handleCopyResult}>
                <svg className="w-6 h-6 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <title>Copy result</title>
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
                <IntlProvider locale={locale} messages={messages[locale]}>
                  <FormattedMessage id="copy"></FormattedMessage>
                </IntlProvider>
              </button>
            </HideShow>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}


