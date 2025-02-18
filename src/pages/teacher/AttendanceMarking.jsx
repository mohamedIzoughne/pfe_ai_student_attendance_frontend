import "./AttendanceMarking.css";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "@/components/ui/ComboboxDemo";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { Bell } from "lucide-react";
import { useState } from "react";

import manImage from "@/assets/images/man-438081_960_720.png";
import manImage1 from "@/assets/images/More.png";
import manImage2 from "@/assets/images/search.png";
import manImage3 from "@/assets/images/WhatsApp Image 2025-02-11 à 23.37.14_feef5af2.jpg";

const AttendanceMarking = () => {
   const [notifications, setNotifications] = useState(6);
  
    const handleNotificationClick = () => {
      if (notifications > 0) {
        setNotifications(0); // Simule la lecture des notifications
      }
    };

  return (
    <>
      
      <div className="div0">
      <div className="notification-container" onClick={handleNotificationClick}>
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
        <h3> Mark Attendance </h3>
        <div className="vide">
          <div className="vide-vide"></div>
        </div>
      </div>

      <div className="div-center">
        <div>
        <Input placeholder="Search Student name" />
        <img src={manImage2} alt="" />
        </div>
        
        <div className="mini-div-center">
          <div><ComboboxDemo /></div>
          <div><ComboboxDemo /></div>
          <div><ButtonLoading /></div>
        </div>
      </div>

      <table className="Table-record">
        <tr>
          <th>Image</th>
          <th>Student Name</th>
          <th>Student ID</th>
          <th>Attendance %</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>
            <img
            src={manImage3}
              alt=""
            />
          </td>
          <td>Mohammed Izourne</td>
          <td>24439347</td>
          <td>70</td>
          <td>
            <Switch />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={manImage3}
              alt=""
            />
          </td>
          <td>Mohammed Izourne</td>
          <td>24439347</td>
          <td>70</td>
          <td>
            <Switch />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={manImage3}
              alt=""
            />
          </td>
          <td>Mohammed Izourne</td>
          <td>24439347</td>
          <td>70</td>
          <td>
            <Switch />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={manImage3}
              alt=""
            />
          </td>
          <td>Mohammed Izourne</td>
          <td>24439347</td>
          <td>70</td>
          <td>
            <Switch />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={manImage3}
              alt=""
            />
          </td>
          <td>Mohammed Izourne</td>
          <td>24439347</td>
          <td>70</td>
          <td>
            <Switch />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={manImage3}
              alt=""
            />
          </td>
          <td>Mohammed Izourne</td>
          <td>24439347</td>
          <td>70</td>
          <td>
            <Switch />
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={manImage3}
              alt=""
            />
          </td>
          <td>Mohammed Izourne</td>
          <td>24439347</td>
          <td>70</td>
          <td>
            <Switch />
          </td>
        </tr>
      </table>
    </>
  );
};

export default AttendanceMarking;
