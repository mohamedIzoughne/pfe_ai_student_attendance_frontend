import { useState } from "react";
import { Bell } from "lucide-react";
import "./Home.css";
import { ComboboxDemo } from "@/components/ui/ComboboxDemo";

import manImage4 from "@/assets/images/man-438081_960_720.png";
import manImage5 from "@/assets/images/More.png";
import manImage6 from "@/assets/images/Icon.png";
import manImage7 from "@/assets/images/Icon (1).png";
import manImage8 from "@/assets/images/Icon (2).png";
import manImage9 from "@/assets/images/Icon (3).png";

import PieChartComponent from "@/components/ui/PieChartComponent";
import Example from "@/components/ui/LineChart";
import Barchart from "@/components/UI/StackBarchart";

import { IoAddOutline } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineTask } from "react-icons/md";

function Home() {
  const [notifications, setNotifications] = useState(6);

  const handleNotificationClick = () => {
    if (notifications > 0) {
      setNotifications(0); // Simule la lecture des notifications
    }
  };

  return (
    <>
      {/* Bouton de notification */}

      {/* Contenu existant */}
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
        <img className="img2" src={manImage4} alt="" />
        <div className="mini-div">
          <span>Moni Roy</span>
          <h4>Teacher</h4>
        </div>
        <img className="img3" src={manImage5} alt="" />
      </div>

      <div className="container">
        <div className="div1">
          <div>
            <h3>Total Students</h3>
            <span>356</span>
          </div>
          <img src={manImage6} alt="" />
        </div>
        <div className="div1">
          <div>
            <h3>Total Subjects</h3>
            <span>34</span>
          </div>
          <img src={manImage7} alt="" />
        </div>
        <div className="div1">
          <div>
            <h3>Total Complaints</h3>
            <span>268</span>
          </div>
          <img src={manImage8} alt="" />
        </div>
        <div className="div1 ">
          <div>
            <h3>Total Hours</h3>
            <span>40</span>
          </div>
          <img src={manImage9} alt="" />
        </div>
      </div>

      <div className="container-2">
        <div className="div2">
          <div className="mini-div-2">
            <h4>Students by Gender</h4>
            <div>
              <ComboboxDemo className="comboButton" width="105px" />
            </div>
          </div>

          <div className="piechart-1">
            <PieChartComponent />
          </div>
        </div>

        <div className="div2-2">
          <div className="mini-div-2">
            <h4>Weekly Attendance</h4>
            <div className="comboButton">
              <div>
                <ComboboxDemo width="120px" />
              </div>
              <div>
                <ComboboxDemo width="100px" />
              </div>
            </div>
          </div>

          <div className="piechart-1">
            <Example />
          </div>
        </div>
      </div>

      <div className="div-Table">
        <div className="just-title">
          <h3>Schedule</h3>
        </div>
        <table>
          <tr>
            <th></th>
            <th className="high-title">Monday</th>
            <th className="high-title">Tuesday</th>
            <th className="high-title">Wednesday</th>
            <th className="high-title">Thursday</th>
            <th className="high-title">Friday</th>
            <th className="high-title">Saturday</th>
          </tr>
          <tr>
            <td className="special">
              8h30m <br /> - <br />
              10h15m
            </td>
            <td>
              {" "}
              <div className="th-div bg-[#FDFCE8]">
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="special">
              10h30m <br /> - <br />
              12h15m
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              {" "}
              <div className="th-div bg-[#FDFCE8]">
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              {" "}
              <div className="th-div bg-[#F8ECF6]" color="#F8ECF6">
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              {" "}
              <div className="th-div bg-[#FDFCE8]">
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
          </tr>
          <tr>
            <td className="special">
              14h30m <br /> - <br />
              16h15m
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              {" "}
              <div className="th-div bg-[#F8ECF6]">
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="special">
              16h30m <br /> - <br />
              18h15m
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
            <td>
              {" "}
              <div className="th-div bg-[#FDFCE8]">
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              {" "}
              <div className="th-div bg-[#F3F0FF]">
                <p>Classe GI 1 G3 - Java</p>
                <h2>Java</h2>
              </div>
            </td>
            <td>
              <button>
                <IoAddOutline className="stroke-[#538cac] Add-Button" />
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div className="partie-barchart-principal">
        <div className="partie-barchart">
          <div className="title-barchart">
            <h2>Class Attendance</h2>
            <div>
              <ComboboxDemo width="100px" />
            </div>
          </div>
          <Barchart />
        </div>

        <div className="end-part">
          <div className="header-end-part">
            <div>
              <h2>Your Subjects</h2>
              <span>42</span>
            </div>
            <IoEllipsisVertical className="treee" />
          </div>

          <div className="main-end-part-p">
            <div className="main-end-part">
              <div>
                <h2>Java</h2>
                <p>Sessions</p>
                <span>12</span>
              </div>
              <div className="particulier">
                <p>Hours</p>
                <span>8</span>
              </div>
              <div>
                <IoEllipsisVertical className="treee" />
              </div>
            </div>

            <div className="mod-end-part">
              <div className="mod-1">
                <div className="mod-1-1">
                <MdOutlineTask className="icon-mod" />
                  <div className="Info-Info">
                    <h2>Task name</h2>
                    <p>February 5 , 2025</p>
                  </div>
                </div>
                <div>
                <RiDeleteBinLine className="icon-mod icon-mod-delete" />
                </div>
              </div>
            </div>

            <div className="mod-end-part">
              <div className="mod-1">
                <div className="mod-1-1">
                    <MdOutlineQuiz className="icon-mod" />
                  <div className="Info-Info">
                    <h2>Quiz name</h2>
                    <p>February 5 , 2025</p>
                  </div>
                </div>
                <div>
                <RiDeleteBinLine className="icon-mod icon-mod-delete" />
                </div>
              </div>
            </div>
          </div>

          <div className="main-end-part-p">
            <div className="main-end-part">
              <div>
                <h2>Java</h2>
                <p>Sessions</p>
                <span>12</span>
              </div>
              <div className="particulier">
                <p>Hours</p>
                <span>8</span>
              </div>
              <div>
                <IoEllipsisVertical className="treee" />
              </div>
            </div>

            <div className="mod-end-part">
              <div className="mod-1">
                <div className="mod-1-1">
                <MdOutlineTask className="icon-mod" />
                  <div className="Info-Info">
                    <h2>Task name</h2>
                    <p>February 5 , 2025</p>
                  </div>
                </div>
                <div>
                <RiDeleteBinLine className="icon-mod icon-mod-delete" />
                </div>
              </div>
            </div>

            <div className="mod-end-part">
              <div className="mod-1">
                <div className="mod-1-1">
                    <MdOutlineQuiz className="icon-mod" />
                  <div className="Info-Info">
                    <h2>Quiz name</h2>
                    <p>February 5 , 2025</p>
                  </div>
                </div>
                <div>
                <RiDeleteBinLine className="icon-mod icon-mod-delete" />
                </div>
              </div>
            </div>
          </div>

          <div className="main-end-part-p">
            <div className="main-end-part">
              <div>
                <h2>Java</h2>
                <p>Sessions</p>
                <span>12</span>
              </div>
              <div className="particulier">
                <p>Hours</p>
                <span>8</span>
              </div>
              <div>
                <IoEllipsisVertical className="treee" />
              </div>
            </div>

            <div className="mod-end-part">
              <div className="mod-1">
                <div className="mod-1-1">
                <MdOutlineTask className="icon-mod" />
                  <div className="Info-Info">
                    <h2>Task name</h2>
                    <p>February 5 , 2025</p>
                  </div>
                </div>
                <div>
                <RiDeleteBinLine className="icon-mod icon-mod-delete" />
                </div>
              </div>
            </div>

            <div className="mod-end-part">
              <div className="mod-1">
                <div className="mod-1-1">
                    <MdOutlineQuiz className="icon-mod" />
                  <div className="Info-Info">
                    <h2>Quiz name</h2>
                    <p>February 5 , 2025</p>
                  </div>
                </div>
                <div>
                <RiDeleteBinLine className="icon-mod icon-mod-delete" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
