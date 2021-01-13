import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import './Preview.css';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { storage, db } from './firebase';
import firebase from 'firebase';

const Preview = () => {
  const cameraImg = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImg) {
      history.replace('/');
    }
  }, [cameraImg, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid;
    const uploadTask = storage
      .ref(`post/${id}`)
      .putString(cameraImg, 'data_url');

    uploadTask.on(
      'state_changed',
      null,
      (err) => console.log(err),
      () => {
        storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              imageUrl: url,
              userName: 'Justas Tit',
              read: false,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            history.replace('/chats');
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImg} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send now</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
};

export default Preview;
