import { Inter } from "next/font/google";
import React, { useState, useContext } from "react";
import Dropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CKEditor from 'react-ckeditor-component';
import { GlobalContext } from "@/context/GlobalContext";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState('');

  const { createUser } = useContext(GlobalContext)

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Prepend the desired path to the filename
      const imagePath = `https://tasks.vitasoftsolutions.com/media/profile_pictures/${file.name}`;
      
      // Set the profilePicture state to the complete URL
      setProfilePicture(imagePath);
    }
  };


  const handleDateChange = (date) => {
    setBirthdate(date);
    console.log(typeof date);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.editor.getData());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const year = birthdate.getFullYear();
    const month = birthdate.getMonth() + 1;
    const day = birthdate.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


    createUser({
      name: name,
      phone_number: phoneNumber,
      description: description,
      birthdate: formattedDate,
      active_status: isActive,
    });

    console.log({
      name,
      formattedDate,
      phoneNumber,
      isActive,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="my-form">
      <div className="login_box">
        <div className="login_view">
          <h3 className="margin_bottom">Create User</h3>

          <div className="margin_top">
            <label>Profile Picture</label>
            <Dropzone onDrop={handleDrop} accept={['image/*']}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} type="file"/>
                  <div className="profile-picture-container">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" />
                  ) : (
                    <p>Drag 'n' drop a profile picture here, or click to select one</p>
                  )}
                </div>
                </div>
              )}
            </Dropzone>
          </div>

          <div className="margin_top">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control background_color"
              style={{ backgroundColor: 'white' }}
            />
          </div>

          <div className="margin_top">
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-control background_color"
              style={{ backgroundColor: 'white' }}
            />
          </div>

          

          <div className="margin_top">
            <label className="margin_top" >Birthdate</label>
            <div className="">
            <DatePicker
             selected={birthdate}
             onChange={handleDateChange}
             dateFormat="yyyy-MM-dd"
             className="form-control background_color"
             wrapperClassName="datePicker"
            />
          </div>
          </div>

          <div className="margin_top">
            <label>Active Status</label>
            <div style={{ width: '100%'}}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="form-control background_color margin_left"
              style={{ backgroundColor: 'white', marginLeft: '-48.5%'}}
            />
            </div>
          </div>

          <div className="margin_top">
            <label>Description</label>
            <CKEditor content={description} events={{ change: handleDescriptionChange }} />
          </div>

          <div className="margin_top">
            <button type="submit" className="login_button margin_top">
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center" // Position the toast container at the bottom-center
        autoClose={1500} // Close after 3 seconds (adjust as needed)
        style={{
          width: 'fit-content', // Adjust the width as needed
          textAlign: 'center', // Center-align the container's content
        }}
      />
    </form>
  );
};