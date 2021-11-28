import "./fingerBtn.css"
import { useState, useEffect } from 'react';

function FingerBtn() {
    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    
      const [is_visible, setis_visible] = useState(true);
    
      useEffect(() => {
        window.addEventListener("scroll", checkWinPOsition);
        return function cleanup() {
          window.removeEventListener();
      }
      }, []);
    
      function checkWinPOsition(){
        if (window.pageYOffset < 100) {
          setis_visible(true);
      } else {
          setis_visible(false);
      }
      }
    return (<>
        <button onClick={() => scrollToTop()} className={is_visible? "btn btn-primary dont" : "btn btn-secondary see"}><i className="fas fa-hand-point-up"></i></button>
        </>)
}
export default FingerBtn;