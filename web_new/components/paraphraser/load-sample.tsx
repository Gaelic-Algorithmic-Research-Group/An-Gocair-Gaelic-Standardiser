const LoadSample = (setInputText: (arg0: string) => void) => {
  var array = [
    "Cha'n 'eil mi 'fuirach 'nam thigh mór an-seo ann an Éirinn, gu mi-fhortanach, ach siod a' cheud tigh a bh' agam-sa",
    "bhu ad a fuireach ann an Inhbir-Nìs an uar sen.",
    "Luchd-reic Charbad, Acuinn agus Thruncaichean.",
    "Tha ar prisean iosal, agus tha 'm bathar dhe'n t-seorsa 's fhearr.",
    "Thòisich leann-dubh air buaidh fhaotainn air Màiri bhochd.",
    "TD MU DHAOINE GHEIBH BOGADH BATHAIDH, ATH-BHEOTHACHADH.",
    "'S é 'n duine nuadh a theirear ris an nuadh chreatuir so,",
    "Tha an cogadh a sior dhol air adhart ann an Cuba.",
    `“ged a bhtodh a’ righ marabh a mairleach, ors i se, “bu bheg do chuid sa dhern iite seo, !’ or: i3e.`,
    `La r-na-mhaireach thanaig an dotar a-ri—ist agas thg e leis a’ minister a nuas a chiomhead air a’ghille so.`,
    `"S e bric a bha sin."A!well" ors esan,"taingdhut, a Dhia" ors esan`,
    `"A gabha tu" ors eisean "dine comhla ruit" ors esan?`,
  ];
  var text = array[Math.floor(Math.random() * array.length)];
  //document.querySelector('textarea').value = randomtext;
  setInputText(text);
};

export default LoadSample;
