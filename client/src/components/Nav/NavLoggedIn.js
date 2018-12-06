import React from "react";
import { Link } from 'react-router-dom';

export const NavLoggedIn = (props) => {

  return (
    <React.Fragment>
      <div className='mt-2 mr-1'>
      <div className='inline-flex cursor-pointer items-center group-hover:rounded-t-lg py-1 px-2' data-toggle="collapse" data-target="#navbar-collapse.in">
        <div><Link className="text-white text-xl font-header font-bold hover:text-brand-green" to="/account">My Account</Link><span className="sr-only">My Account</span></div>
      </div>
      <hr class="border-t-1 mx-2 border-brand-green"></hr>
      <div className="absolute p-1 mr-2 bg-soft-black text-center p-2 rounded-b-lg invisible group-hover:visible w-full border-solid border-b-2 border-l-2 border-r-2 border-white">
        <div onClick={(event) => props.logOutHandler(event)} data-toggle="collapse" data-target="#navbar-collapse.in"><Link className="text-light-gray text-lg font-header hover:text-brand-green" to="/">Sign Out</Link><span className="sr-only">Sign Out</span></div>
      </div>
      </div>
    </React.Fragment>
  );
};
