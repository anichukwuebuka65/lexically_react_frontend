import React, { Component } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {};
    this.username = localStorage.getItem("lexically__name");
  }

  render() {
    const { showMenuButton, firstRender, toggleMenuButton, toggleUploadModal } =
      this.props;

    return (
      <header className="fixed right-0 left-0 z-40">
        <div className="z-20 relative flex justify-between items-center h-14 bg-slate-100 ">
          <Link
            to="/"
            className="md:text-4xl md:px-6  italic font-black rounded-sm ml-2 font-mono"
          >
            <span>Lexical</span>
          </Link>
          <div className="sm:flex hidden font-mono justify-center items-center space-x-6 mr-8 text-lg">
            <Link to="/" className="hover:cursor-pointer hover:underline">
              Home
            </Link>
            <Link
              to="/collections"
              className=" hover:cursor-pointer hover:underline"
            >
              collections
            </Link>
            {!this.username && (
              <button
                onClick={toggleUploadModal}
                className="flex items-center space-x-2 font-bold font-mono rounded-full py-px px-3 tracking-wide bg-emerald-900 text-white "
              >
                <b>Sign In</b>
              </button>
            )}
          </div>
          <button
            onClick={toggleMenuButton}
            className={`${
              showMenuButton && "hidden"
            } sm:hidden mr-8 text-2xl hover:cursor-pointer`}
          >
            <AiOutlineMenu />
          </button>
          <button
            onClick={toggleMenuButton}
            className={`${
              !showMenuButton && "hidden"
            } sm:hidden mr-8 text-2xl hover:cursor-pointer`}
          >
            <IoClose />
          </button>
        </div>
        <div
          className={`absolute ${
            !showMenuButton && !firstRender
              ? "animate-hideslow"
              : showMenuButton && "animate-dropslow "
          }
         z-0 -top-14 sm:hidden font-semibold  border-b-2 border-slate-500 flex flex-col justify-content-start
         space-y-2 text-xl text-white py-1.5 px-3 bg-cyan-900 w-full`}
        >
          <Link to="/" onClick={toggleMenuButton}>
            Home
          </Link>
          <Link to="/collections" onClick={toggleMenuButton}>
            Collections
          </Link>
          {!this.username && (
            <div
              role="button"
              className="justify-self-start"
              onClick={this.props.toggleUploadModal}
            >
              Sign In
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default NavBar;
