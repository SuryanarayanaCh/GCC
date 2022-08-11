import { IconButton } from "@material-ui/core";
import { AssignmentIndOutlined, FolderOpenOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassCard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
  
function ClassCard({ name, creatorName, coursecode, creatorPhoto, id, style }) {
  const [user, loading, error] = useAuthState(auth);
  const [classId, setClassId] = useState(id);
  const [classData,setClassData] = useState([]);

  // console.log(classData.coursecode);

  useEffect(() =>{
    const getDocs = async () => {
      const classRef = await db.collection("classes").doc(classId).get();
      const tempData = classRef.data();
      // console.log(tempData);
     setClassData(tempData);
    }
    if(classId!==""){getDocs();}
  },[classId]);

  const history = useNavigate();
  const goToClass = () => {
    history(`/class/${id}`);
  };
  return (
    <div className="classCard" style={style} onClick={goToClass}>
      <div className="classCard__upper">
        <div className="classCard__className">
          {name}
          {classData.creatorUid === user.uid && 
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Gold_Star_%28with_border%29.svg" className="star"/>
          }
        </div>
        <div className="classCard__coursecode">{classData.coursecode}</div>
        {classData.creatorUid !== user.uid && <div className="classCard__creatorName">{creatorName}</div>}
        
        <img src={creatorPhoto} className="classCard__creatorPhoto" />
      </div>
      <div className="classCard__middle"></div>
      <div className="classCard__lower">
      
        <IconButton>
          <FolderOpenOutlined />
        </IconButton>
        <IconButton>
          <AssignmentIndOutlined />
        </IconButton>
      </div>
    </div>
  );
}
export default ClassCard;