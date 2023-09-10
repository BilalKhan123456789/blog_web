"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  // its Router to Move components
  const route = useRouter();

  //  its State to get all input Values
  const [data, setdata] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // its postApi to send data your data_Base
  const send_data = () => {
    if (
      data.fname == "" ||
      data.lname == "" ||
      data.email == "" ||
      data.password == "" ||
      data.cpassword == ""
    ) {
      toast.error("Please enter data ", {
        autoClose: 2000,
      });
    } else {
      if (data.password == data.cpassword) {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:3000/api/post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: data.password,
            cpassword: data.cpassword,
          },
        };

        axios
          .request(config)
          .then((response) => {
            // console.log(response.data);

            if (response.data.message == "user already registered") {
              toast.error("user already registered");
            } else {
              toast.success("Thanks for submit details");
              route.push("./Components/Login");
            }
          })

          .catch((error) => {
            console.log(error);
            toast.warning("Please enter correct details");
          });
      }
    }
  };

  return (
    <>
      {/* Navbar */}

      <header className="text-white bg-purple-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="/"
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
            <a className="mr-5 hover:text-gray-900"> </a>
          </nav>
          <button
            onClick={() => route.push("./Components/Login")}
            className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:bg-purple-800 rounded text-base mt-4 md:mt-0"
          >
            Login
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path></svg>    </button> </div>  </header>
       
    
      {/* Heading */}

      <div className=" p-3 bg-gray-100 w-screen ">
        <h1 className="font-bold text-2xl md:text-4xl text-center  mt-3">
          Signup
        </h1>
      </div>

{/* it form to get user information */}
      <form className="w-1/2 mx-auto mt-5 border-2 border-solid p-5 rounded-lg">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) =>
                setdata({ ...data, [e.target.name]: e.target.value })}
              type="text"
              name="fname"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First name
            </label> </div>
          
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) =>
                setdata({ ...data, [e.target.name]: e.target.value })}
              type="text"
              name="lname"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required/>
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Last name
            </label> </div></div>
          <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={(e) =>
              setdata({ ...data, [e.target.name]: e.target.value })
            }
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required/>
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label> </div>
               <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={(e) =>
              setdata({ ...data, [e.target.name]: e.target.value })}
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required/>
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={(e) =>
              setdata({ ...data, [e.target.name]: e.target.value })
            }
            type="password"
            name="cpassword"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required/>
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Confirm password
          </label></div>

        <button
          type="button"
          onClick={() => send_data()}
          className="text-white bg-gradient-to-r mt-2 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Signup
        </button>
      </form>

      <ToastContainer />
    </>
  );
}
