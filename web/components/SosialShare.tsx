import { useEffect, useState } from "react";

function SosialShare() {
  const [facebookLink, setFacebook] = useState('#')
  const [twitterLink, setTwitter] = useState('#')
  // const [pinterestLink, setPinterest] = useState('')
  const [linkedinLink, setLinkedin] = useState('#')
  const [whatsappLink, setWhatsapp] = useState('#')

  useEffect(() => {
    if (typeof window === undefined) return;
    const postUrl = encodeURIComponent(document.location.href);
    const postTitle = encodeURIComponent("Hi everyone, please check this out: ");
    // const postImg = '';
    setFacebook(`https://www.facebook.com/sharer.php?u=${postUrl}`)
    setTwitter(`https://twitter.com/share?url=${postUrl}&text=${postTitle}`)
    // setPinterest(`https://pinterest.com/pin/create/bookmarklet/?media=${postImg}&url=${postUrl}&description=${postTitle}`)
    setLinkedin(`https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`)
    setWhatsapp(`https://wa.me/?text=${postTitle} ${postUrl}`)
  }, []);
  return <div className="share-btn-container">
    <a href={facebookLink}>
      <i className="fab fa-facebook"></i>
    </a>

    <a href={twitterLink}>
      <i className="fab fa-twitter"></i>
    </a>
{/* 
    <a href={pinterestLink}>
      <i className="fas fa-pinterest"></i>
    </a> */}
    <a href="mailto:w.lamb@ed.ac.uk">
      <i className="fas fa-envelope"></i>
    </a>
    
    <a href={linkedinLink}>
      <i className="fab fa-linkedin"></i>
    </a>

    <a href={whatsappLink}>
      <i className="fab fa-whatsapp"></i>
    </a>
  </div>
}

export default SosialShare;
