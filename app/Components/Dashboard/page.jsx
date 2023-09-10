"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dropdown, Modal, initTE, Ripple } from "tw-elements";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  // its get id in your localStorage
  const getdatafromlocalstroge = localStorage.getItem("id");

  // its state work to open your edit modal
  const [showModal, setShowModal] = useState(false);

  // its state work to show current data in modal & update your post
  const [etitle, setetitle] = useState();
  const [emessage, setemessage] = useState();
  const [eimageLink, seteimageLink] = useState();

  // its state work to save you current post id when you click runtime
  const [editid, seteditid] = useState();

  // its state work to show current profile in modal & update your Profile
  const [alldata, setalldata] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // its state to work to go your profile section using terniary
  const [MyProfile, setmMyProfile] = useState(false);

  // its state to work show your profile data
  const [MyProfilePost, setMyProfilePost] = useState([]);

  // its state to work to save your uid
  const [uid, setuid] = useState("");

  // its state to work to save your name
  const [name, setname] = useState("");

  // its state to work to save your data
  const [data, setdata] = useState({
    title: "",
    message: "",
    imageLink: "",
  });

  // its route your page
  const route = useRouter();

  // its state to work show all users post
  const [val, setval] = useState([]);

  const editPost = (e) => {
    seteditid(e);

    setShowModal(true);

    for (const i of MyProfilePost) {
      console.log(i.title);

      if (i._id == editid) {
        setetitle(i.title);
        setemessage(i.message);

        seteimageLink(i.imageLink);
      }
    }
  };

  const update_post = () => {
    setShowModal(false);

    // console.log(etitle)
    // console.log(emessage)
    // console.log(eimageLink)

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/postblog/${editid}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: etitle,
        message: emessage,
        imageLink: eimageLink,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("Post Update", {
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const update_profile = () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/get/${alldata._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        fname: alldata.fname,
        lname: alldata.lname,
        email: alldata.email,
        password: alldata.password,
        cpassword: alldata.cpassword,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const singlePost = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/get/${getdatafromlocalstroge}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
        setalldata(response.data.data);
        setname(response.data.data.fname);
        setuid(response.data.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const singleUserPost = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/postblog/${getdatafromlocalstroge}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
        setMyProfilePost(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const del = (e) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/postblog/${e}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("Post Successfully Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postBlog = () => {
    if (data.title == "" || data.message == "") {
      toast.warning("Please enter data", {
        autoClose: 2000,
      });
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/postblog",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: data.title,
        message: data.message,
        imageLink: data.imageLink,
        name: name,
        uid: uid,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("Blogs Uploaded", {
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/postblog",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        //  console.log(response.data);
        setval(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    singlePost();
    singleUserPost();
    initTE({ Dropdown, Ripple, Modal });
  }, []);

  return (
    <div className="overflow-hidden">
      <header className="text-white bg-purple-600 fixed w-screen  body-font">
        <div className="container mx-auto    flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href=""
            className="flex title-font font-medium items-centestrokeWidthr text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-2xl font-bold text-yellow-200">
              Personal Bloging App
            </span>
          </a>
          <nav className=" md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900"></a>
            <a className="mr-5 hover:text-gray-900"> </a>
            <a className="mr-5 hover:text-gray-900"> </a>
            <button
              type="button"
              data-te-toggle="modal"
              data-te-target="#staticBackdrop"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mr-5 hover:text-gray-100"
            >
              Add Blogs{" "}
            </button>
          </nav>

          <a
            className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
              className="rounded-full w-10 h-10"
              alt="Avatar"
              loading="lazy"
            />
            <span className="w-2 pl-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-ule="evenodd"
                />
              </svg>
            </span>
          </a>
          <ul
            className="absolute left-0 right-auto z-[1000] float-left m-0 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButton2"
            data-te-dropdown-menu-ref
          >
            <li>
              <button
                onClick={() => setmMyProfile(true)}
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                href="#"
                data-te-dropdown-item-ref
              >
                My profile
              </button>
            </li>

            <li>
              <button
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                href="#"
                onClick={() => route.replace("/")}
                data-te-dropdown-item-ref
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* show all blogs */}

      {/* Edit modal start */}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="     ">
                    <label
                      htmlFor="text"
                      className="block mt-2 text-md font-bold  text-gray-900 dark:text-white"
                    >
                      Your Title
                    </label>
                    <input
                      type="text"
                      id="text"
                      value={etitle}
                      onChange={(e) => setetitle(e.target.value)}
                      name="etitle"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your title"
                    />

                    <label
                      htmlFor="text"
                      className="block mt-2 text-md font-bold  text-gray-900 dark:text-white"
                    >
                      Drop Image Link
                    </label>
                    <input
                      type="text"
                      value={eimageLink}
                      onChange={(e) => seteimageLink(e.target.value)}
                      id="text"
                      name="eimageLink"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Drop Image Link"
                    />

                    <label
                      htmlFor="text"
                      className="block mt-2  text-md font-bold  text-gray-900 dark:text-white"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={emessage}
                      rows="4"
                      name="emessage"
                      onChange={(e) => setemessage(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Leave a message..."
                    ></textarea>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => update_post()}
                    type="button"
                    className="text-white  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* edit modal end */}

      {MyProfile ? (
        <>
          <div className=" w-full overflow-hidden shadow-xl max-w-lg mx-auto mt-24 bg-purple-900">
            <div className="flex justify-center mt-8">
              <img
                src="data:image/png;base64,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"
                className="rounded-full border-solid border-white border-2 -mt-3"
              />
            </div>
            <div className="text-center px-3 pb-6 pt-2">
              <h3 className="text-white text-2xl bold font-sans">{name}</h3>
              <p className="mt-2 font-sans text-lg font-light text-white">
                Hello, I am {name}
              </p>
            </div>
          </div>

          <div className="w-1/3 flex items-center  justify-between mt-5 mx-auto">
            <h1 className="font-bold text-2xl text-center mt-5">My Blogs</h1>

            <button
              data-te-toggle="modal"
              data-te-target="#staticBackdrop"
              data-te-ripple-init
              data-te-ripple-color="light"
              type="button"
              className="text-white mt-5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Edit Profile
            </button>
          </div>

          {MyProfilePost.map((v, i) => {
            return (
              <>
                <div
                  className="mt-4  dark:bg-gray-900 flex items-center  justify-center w-1/2 mx-auto "
                  key={i}
                >
                  <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg">
                    <div className="flex mb-4">
                      <img
                        className="w-12 h-12 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      />
                      <div className="ml-2 mt-0.5">
                        <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">
                          {v.name}
                        </span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                          16 December at 08:25
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal mb-2">
                      {v.title}
                    </p>

                    <img src={v.imageLink} alt="" className="w-screen" />
                    <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal mt-2">
                      {v.message}
                    </p>

                    <div className="flex justify-between items-center mt-5">
                      <div className="flex ">
                        <span className="ml-1 text-gray-500 dark:text-gray-400  font-light">
                          8
                        </span>
                      </div>
                      <div className="ml-1 text-gray-500 dark:text-gray-400 font-light">
                        33 comments
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => editPost(v._id)}
                        className="underline text-purple-700"
                      >
                        edit{" "}
                      </button>
                      <button
                        onClick={() => del(v._id)}
                        className="underline text-purple-700 ml-3"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          {/* <!-- Modal --> */}
          <div
            data-te-modal-init
            className="fixed left-0 top-0 mt-28 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="staticBackdrop"
            data-te-backdrop="static"
            data-te-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div
              data-te-modal-dialog-ref
              className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
            >
              <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  {/* <!--Modal title--> */}
                  <h5
                    className="text-xl font-medium mt-5 leading-normal text-neutral-800 dark:text-neutral-200"
                    id="staticBackdropLabel"
                  >
                    Modal title
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none mt-5 border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* <!--Modal body--> */}
                <div data-te-modal-body-ref className="relative p-4">
                  <form className=" mx-auto  rounded-lg">
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          value={alldata.fname}
                          onChange={(e) =>
                            setalldata({
                              ...alldata,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          name="fname"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          First name
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          value={alldata.lname}
                          onChange={(e) =>
                            setalldata({
                              ...alldata,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          name="lname"
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="floating_last_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name
                        </label>
                      </div>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        onChange={(e) =>
                          setalldata({
                            ...alldata,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={alldata.email}
                        type="email"
                        name="email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        value={alldata.password}
                        onChange={(e) =>
                          setalldata({
                            ...alldata,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="password"
                        name="password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Password
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        onChange={(e) =>
                          setalldata({
                            ...alldata,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="password"
                        name="cpassword"
                        id="floating_repeat_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={alldata.cpassword}
                        required
                      />
                      <label
                        htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Confirm password
                      </label>
                    </div>
                  </form>
                </div>

                {/* <!--Modal footer--> */}
                <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    data-te-modal-dismiss
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => update_profile()}
                    type="button"
                    className="text-white mt-5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    update profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        val.map((v, i) => {
          return (
            <>
              <div
                className="mt-28  dark:bg-gray-900 flex items-center justify-center w-1/2 mx-auto "
                key={i}
              >
                <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg">
                  <div className="flex mb-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <div className="ml-2 mt-0.5">
                      <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">
                        {v.name}
                      </span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                        16 December at 08:25
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal mb-2">
                    {v.title}
                  </p>

                  <img src={v.imageLink} alt="" className="w-screen" />
                  <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal mt-2">
                    {v.message}
                  </p>

                  <div className="flex justify-between items-center mt-5">
                    <div className="flex ">
                      <span className="ml-1 text-gray-500 dark:text-gray-400  font-light">
                        8
                      </span>
                    </div>
                    <div className="ml-1 text-gray-500 dark:text-gray-400 font-light">
                      33 comments
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}

      {/* <!-- Modal --> */}
      <div
        data-te-modal-init
        className="fixed left-0 top-0 mt-24  z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="staticBackdrop"
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              {/* <!--Modal title--> */}
              <h5
                className="text-xl font-medium mt-3 leading-normal text-neutral-800 dark:text-neutral-200"
                id="staticBackdropLabel"
              >
                Dashboard
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none mt-3 border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!--Modal body--> */}
            <div data-te-modal-body-ref className="relative p-4">
              <form className="mx-auto mt-2">
                <label
                  htmlFor="text"
                  className="block mt-2 text-md font-bold  text-gray-900 dark:text-white"
                >
                  Your Title
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setdata({ ...data, [e.target.name]: e.target.value })
                  }
                  id="text"
                  name="title"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your title"
                />

                <label
                  htmlFor="text"
                  className="block mt-2 text-md font-bold  text-gray-900 dark:text-white"
                >
                  Drop Image Link
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setdata({ ...data, [e.target.name]: e.target.value })
                  }
                  id="text"
                  name="imageLink"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Drop Image Link"
                />

                <label
                  htmlFor="text"
                  className="block mt-2  text-md font-bold  text-gray-900 dark:text-white"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  onChange={(e) =>
                    setdata({ ...data, [e.target.name]: e.target.value })
                  }
                  rows="4"
                  name="message"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Leave a message..."
                ></textarea>
              </form>
            </div>

            {/* <!--Modal footer--> */}
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Close
              </button>

              <button
                data-te-ripple-init
                data-te-ripple-color="light"
                type="button"
                className="text-white bg-gradient-to-r mt-2 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => postBlog()}
                data-te-modal-dismiss
              >
                Publish Blog
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default page;
