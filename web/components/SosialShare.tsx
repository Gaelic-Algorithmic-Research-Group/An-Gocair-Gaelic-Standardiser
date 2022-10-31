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
    const postTitle = encodeURIComponent("Am faca sibh an t-inneal seo? ");
    // const postImg = '';
    setFacebook(`https://www.facebook.com/sharer.php?u=${postUrl}`)
    setTwitter(`https://twitter.com/share?url=${postUrl}&text=${postTitle}`)
    // setPinterest(`https://pinterest.com/pin/create/bookmarklet/?media=${postImg}&url=${postUrl}&description=${postTitle}`)
    setLinkedin(`https://www.linkedin.com/shareArticle?url=${postUrl}&title=An Gocair is a new transformer-based tool for normalising Gaelic text to modern spelling conventions. Think of it like an AI-assisted spell corrector`)
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
    <a href="mailto:garg@ed.ac.uk">
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
