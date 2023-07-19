import { Link } from "react-router-dom"

import Wrapper from "../assets/wrappers/LandingPage"
import main from "../../src/assets/images/main.svg"
import { Logo } from "../components"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Unicorn chillwave bruh portland four loko. Succulents af gatekeep
            8-bit same neutral milk hotel. Artisan synth semiotics, church-key
            quinoa vaporware trust fund slow-carb gluten-free keffiyeh selfies
            schlitz bitters swag. Fashion axe mukbang hashtag, DSA JOMO
            sartorial bruh pickled forage. Bespoke bruh grailed, stumptown jean
            shorts celiac blue bottle cronut fingerstache chicharrones
            vibecession ascot. Vegan lomo copper mug mumblecore lo-fi.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
