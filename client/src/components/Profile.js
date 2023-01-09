import React,{useEffect,useState} from "react";
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {userLogin} from '../reducers/authReducers';
import {useNavigate} from 'react-router-dom'


function Profile() {

    const [profileData, setProfileData] = useState([]);
    

    let data =   useSelector((state)=>{
        return state;
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getProfileData=async()=>{
        try {
           
            let token = await data.users.token;
            // console.log(token)
            const res= await axios.get(`http://localhost:4000/api/v1/profile`,{
                headers:{ Authorization :token}
             })
             console.log(res.data.result)
             await setProfileData(res.data.result)
        } catch (err) {
            console.log(err.response.data.msg)
        }
    }

    useEffect(() => {
       

        getProfileData()
        
    }, [data])
    

    if (!profileData[0]) {
        return <div className="container my-5 text-center"><h1 >Loading Please Wait</h1></div>;
    }



    const {name,email,phone,role}= profileData[0];


    const Logout = async()=>{
        try {
             let result = await axios.get('http://localhost:4000/api/v1/logout');
             console.log(result); 
             localStorage.clear();
             dispatch(userLogin(''));
        navigate('/');

        } catch (err) {
          console.log(err)
        }
    }
  return (
    <div className="container my-5 ">
      <div className="row">
        <div className="offset-md-4 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h1>Profile</h1>
                <hr className="mt-0" />
              </div>
              <div className="d-flex justify-content-between">
                <b>Name:-</b>
                <p>{name}</p>
              </div>
              <div className="d-flex justify-content-between">
                <b>Email:-</b>
                <p>{email}</p>
              </div>
              <div className="d-flex justify-content-between">
                <b>Phone:-</b>
                <p>{phone}</p>
              </div>
              <div className="d-flex justify-content-between">
                <b>Role:-</b>
                <p>{role==="1"?"User":"Admin"}</p>
              </div>
              <div className="d-flex justify-content-center">
                    <button className="btn btn-success" onClick={Logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
