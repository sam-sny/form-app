import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import CKEditor from 'react-ckeditor-component';
import { GlobalContext } from '@/context/GlobalContext';

const Edit = () => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState('sampson');

  const { editUser, getUserData } = useContext(GlobalContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          const userData = await getUserData(id);
          setName(userData.name || '');
          setProfilePicture(userData.profile_picture || '');
          
          // Check if userData.birthdate is a valid date string before creating a Date object
          setBirthdate(userData.birthdate ? new Date(userData.birthdate) : '');

          setIsActive(userData.active_status || false);
          setDescription(userData.description || 'sampson');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [getUserData, id]);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const imagePath = `https://tasks.vitasoftsolutions.com/media/profile_pictures/${file.name}`;
      setProfilePicture(imagePath);
    }
  };

  const handleDateChange = (date) => {
    setBirthdate(date);
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

    editUser({
      name,
      phone_number: '08086410438',
      profile_picture: null, // Update this as needed
      description,
      birthdate: formattedDate,
      active_status: isActive,
    }, id);

    console.log({
      name,
      formattedDate,
      phone_number: '',
      active_status: isActive,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-form">
      <div className="login_box">
        <div className="login_view">
          <h3 className="">Edit User</h3>

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
            <label>Profile Picture</label>
            <Dropzone onDrop={handleDrop} accept={{ mimeType: 'image/*' }}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
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
            <label>Birthdate</label>
            <DatePicker selected={birthdate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
          </div>

          <div className="margin_top">
            <label>Active Status</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="form-control background_color"
              style={{ backgroundColor: 'white' }}
            />
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
    </form>
  );
};

export default Edit;
