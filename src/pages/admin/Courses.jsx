import React from "react";

import { Bell, Pointer } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import manImage from "@/assets/images/man-438081_960_720.png";
import manImage1 from "@/assets/images/More.png";
import manImage2 from "@/assets/images/search.png";

import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

import "./Courses.css";

const Courses = () => {
  const [notifications, setNotifications] = useState(6);

  const handleNotificationClick = () => {
    if (notifications > 0) {
      setNotifications(0); // Simule la lecture des notifications
    }
  };
  return (
    <>
      <div className="div0">
        <div
          className="notification-container"
          onClick={handleNotificationClick}
        >
          <Bell className="notification-icon" size={30} color="#4880FF" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </div>
        <img className="img2" src={manImage} alt="" />
        <div className="mini-div">
          <span>Moni Roy</span>
          <h4>Teacher</h4>
        </div>
        <img className="img3" src={manImage1} alt="" />
      </div>

      <div className="title">
        <h3> Courses </h3>
        <div className="vide">
          <div className="vide-vide"></div>
        </div>
      </div>

      <div className="div-center items-center">
        <div>
          <Input placeholder="Search Student name" />
          <img src={manImage2} alt="" />
        </div>

        <div className="mini-div-center mini-div-center-2">
          <button className="btn1">+</button>
        </div>
      </div>

      <table className="table-admin">
        <tr>
          <th className="rounded-tl-xl">Class name</th>
          <th>Grade</th>
          <th>Capacity</th>
          <th>Supervisor</th>
          <th className="rounded-tr-xl">Actions</th>
        </tr>
        <tr>
        <td className="Classs">GI 1</td>
          <td className="Gradee">1</td>
          <td className="Capa">25</td>
          <td className="superv">Mazoul</td>
          <td>
            <div  className="icons-admin flex justify-center  align-middle">
            <RiDeleteBinLine className="mr-3 cursor-pointer" />
            <FiEdit3 className="cursor-pointer" />
            </div>
            
          </td>
        </tr>
        <tr>
        <td className="Classs">GI 1</td>
        <td className="Gradee">1</td>
        <td className="Capa">25</td>
          <td className="superv">Mazoul</td>
          <td>
          <div  className="icons-admin flex justify-center align-middle  ">
            <RiDeleteBinLine className="mr-3 cursor-pointer" />
            <FiEdit3 className="cursor-pointer" />
            </div>
          </td>
          
        </tr>
        <tr>
        <td className="Classs">GI 1</td>
        <td className="Gradee">1</td>
        <td className="Capa">25</td>
          <td className="superv">Mazoul</td>
          <td>
          <div  className="icons-admin flex justify-center align-middle  ">
            <RiDeleteBinLine className="mr-3 cursor-pointer" />
            <FiEdit3 className="cursor-pointer" />
            </div>
          </td>
          
        </tr>
        <tr>
        <td className="Classs">GI 1</td>
        <td className="Gradee">1</td>
        <td className="Capa">25</td>
          <td className="superv">Mazoul</td>
          <td>
          <div  className="icons-admin flex justify-center align-middle  ">
            <RiDeleteBinLine className="mr-3 cursor-pointer" />
            <FiEdit3 className="cursor-pointer" />
            </div>
          </td>
          
        </tr>
        <tr>
        <td className="Classs">GI 1</td>
        <td className="Gradee">1</td>
        <td className="Capa">25</td>
          <td className="superv">Mazoul</td>
          <td>
          <div  className="icons-admin   flex justify-center  ">
            <RiDeleteBinLine className="mr-3 cursor-pointer" />
            <FiEdit3 className="cursor-pointer" />
            </div>
          </td>
          
        </tr>
        <tr className="last-row">
          <td className="Classs ">GI 1</td>
          <td className="Gradee">1</td>
          <td className="Capa">25</td>
          <td className="superv">Mazoul</td>

          <td className="  border-solid">
          <div  className="icons-admin flex justify-center align-middle  ">
            <RiDeleteBinLine className="mr-3 cursor-pointer" />
            <FiEdit3 className="cursor-pointer" />
            </div>
          </td>
          
        </tr>
      </table>
    </>
  );
};

export default Courses;
