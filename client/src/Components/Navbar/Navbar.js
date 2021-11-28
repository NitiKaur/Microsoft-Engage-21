/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import Auth from '../../auth'
const Navbar = () => {

  function animation() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {

    animation();
    $(window).on('resize', function () {
      setTimeout(function () { animation(); }, 500);
    });

  }, []);

  const [icon_menu, setCount] = useState(true);
  function change() {

    if (icon_menu === true) {
      setCount(false);
    } else {
      setCount(true);
    }
  }

  const logoutNow = () => {
    Auth.isAuthenticated = false;
    localStorage.setItem('usertoken', '');
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">

      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        Classroom <i style={{ marginLeft: '5px' }} className="far fa-user"> </i>
      </NavLink>


      <button
        className="navbar-toggler"
        onClick={function () {
          change();
          setTimeout(function () { animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className={icon_menu ? "fas text-white fa-bars" : "fas text-white fa-times"}></i>
      </button>
     
      <div
        className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className=" navbar-nav ml-auto">

          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>

          <li className="nav-item active">
            <NavLink className="nav-link" to="/" exact>
              <i className="fas fa-home">
              </i>ClassRoom
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/discussion" exact>
              <i
                className="far fa-chart-bar">
              </i>Discussion
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/about" exact>
              <i
                className="far fa-address-book">
              </i>About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/manage" exact>
              <i
                className="far fa-copy">
              </i>Manage
            </NavLink>
          </li>
          <button className="btn logoutBtn" onClick={logoutNow}><i
            className="far fa-user">
          </i>Log out</button>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;