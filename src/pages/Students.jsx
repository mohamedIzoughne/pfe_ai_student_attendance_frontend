import React from "react";
import "./Students_admin.css";
import manImage4 from "@/assets/images/man-438081_960_720.png";
import manImage41 from "@/assets/images/image (2).png";
import manImage5 from "@/assets/images/More.png";
import manImage6 from "@/assets/images/Ellipse 2755.png";
import { useState } from "react";
import { Bell } from "lucide-react";
// import { IoAddOutline } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import manImage2 from "@/assets/images/search.png";

import { FiEdit3 } from "react-icons/fi";
import { ComboboxDemo } from "@/components/ui/ComboboxDemo";

import PieChartComponent from "@/components/ui/PieChartComponent";

import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { BsDashLg } from "react-icons/bs";
import { FaRegHandPaper } from "react-icons/fa";

function Students() {
  const [notifications, setNotifications] = useState(6);

  const handleNotificationClick = () => {
    if (notifications > 0) {
      setNotifications(0);
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
        <img className="img2" src={manImage4} alt="" />
        <div className="mini-div">
          <span>Moni Roy</span>
          <h4>Teacher</h4>
        </div>
        <img className="img3" src={manImage5} alt="" />
      </div>

      <div className="title">
        <h3> Students </h3>
        <div className="vide">
          <div className="vide-vide"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <ComboboxDemo placeholder="Class" width="100px" />
      </div>
      <div className="students-admin-principal">
        <div className="students-admin">
          <div>
            <Input className="w-60 my-7" />
            <img className="sear-img sear-img-2" src={manImage2} alt="" />
          </div>

          <div className="student-name hover:bg-[#EEEEEE]">
            <div>
              <img src={manImage6} alt="" />
            </div>
            <div className="name">
              <span className="span-1">Mohammed Izourne</span>
              <span className="text-[#454545] text-xs">GI 1</span>
            </div>
          </div>

          <div className="student-name hover:bg-[#EEEEEE]">
            <div>
              <img src={manImage6} alt="" />
            </div>
            <div className="name">
              <span className="span-1">Mohammed Izourne</span>
              <span className="text-[#454545] text-xs">GI 1</span>
            </div>
          </div>

          <div className="student-name hover:bg-[#EEEEEE]">
            <div>
              <img src={manImage6} alt="" />
            </div>
            <div className="name">
              <span className="span-1">Mohammed Izourne</span>
              <span className="text-[#454545] text-xs">GI 1</span>
            </div>
          </div>

          <div className="student-name hover:bg-[#EEEEEE]">
            <div>
              <img src={manImage6} alt="" />
            </div>
            <div className="name">
              <span className="span-1">Mohammed Izourne</span>
              <span className="text-[#454545] text-xs">GI 1</span>
            </div>
          </div>
        </div>

        <div className="student-admin-infos student-admin-infos-2 ">
          <div className="std-info ">
            <div className="st-info-header">
              <h2>Personal info</h2>
              <FiEdit3 className="mx-6 my-2 cursor-pointer" />
            </div>

            <div className="Inpt-infos ">
              <div className="col-12 col-md-6 w-1/2">
                <div>
                  <label htmlFor="">Full Name</label>
                  <div className="information">Mohammed Izourne</div>
                </div>
                <div>
                  <label htmlFor="">Phone number</label>
                  <div className="information">+212 638344943</div>
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <div className="information">izourne@gmail.com</div>
                </div>
              </div>

              <div className="col-12 col-md-6 w-1/2">
                <div>
                  <label htmlFor="">Class</label>
                  <div className="information">GI,group 3</div>
                </div>

                <div>
                  <label htmlFor="">Student ID</label>
                  <div className="information">izourne@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="infos-supple">
            <div className="std-info-contain std-info-contain-2">
              <div className="div-img">
                <img src={manImage41} alt="" />
              </div>

              <div>
                <h1>Mohammed Izourne</h1>
                <p>Izourne@gmail.com</p>
              </div>
            </div>
            <div className="hometown hometown-2">
              <h1>Hometown</h1>
              <div>
                <div className="information">
                  Taznakht, Ouarzazate, Drâa-Tafilalet
                </div>
              </div>
            </div>
          </div>
          <div className="Students-stats flex">
            <div className="Students-stats-1 p-3">
              <div className="Semestre flex justify-end">
                <ComboboxDemo placeholder="Semestre" width="130px" />
              </div>
              <div className="stats-details flex  flex-wrap mt-4">
                <div className="stat-card">
                  <div className="stat-card-header flex justify-between">
                    <div className="Name-ds">
                      <h2>Java Exam 1</h2>
                      <span>java</span>
                    </div>
                    <div className="Number-exam">
                      <span>15</span>
                    </div>
                  </div>
                  <p> March 10, 2024 - 14:30</p>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header flex justify-between">
                    <div className="Name-ds">
                      <h2>Proba Exam 2</h2>
                      <span>Math</span>
                    </div>
                    <div className="Number-exam">
                      <span>16</span>
                    </div>
                  </div>
                  <p> March 10, 2024 - 14:30</p>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header flex justify-between">
                    <div className="Name-ds">
                      <h2>Proba Exam 2</h2>
                      <span>Math</span>
                    </div>
                    <div className="Number-exam">
                      <span>16</span>
                    </div>
                  </div>
                  <p> March 10, 2024 - 14:30</p>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header flex justify-between">
                    <div className="Name-ds">
                      <h2>Proba Exam 2</h2>
                      <span>Math</span>
                    </div>
                    <div className="Number-exam">
                      <span>16</span>
                    </div>
                  </div>
                  <p> March 10, 2024 - 14:30</p>
                </div>
              </div>
            </div>
            <div className="Students-stats-2 p-3">
              <div className="mini-div-2">
                <h4>Attendance rate</h4>
                <div>
                  <ComboboxDemo
                    className="comboButton text-lg"
                    width="120px"
                    placeholder="Subject"
                  />
                </div>
              </div>

              <div className="piechart-1 w-10 ">
                <PieChartComponent
                  colors={["#F93C65", "#4880FF"]}
                  width={350}
                  height={260}
                />
              </div>
            </div>
          </div>
          <div className="Last-part-students flex">
            <div className="Quizez">
              <h2>Total Quizes</h2>
              <div className="Totall">
                <span>16</span>
              </div>
              <div className="time-quizez flex justify-between">
                <div className="time-quize">
                  <p className="success">Success</p>
                  <div>
                    <span>02</span>
                  </div>
                </div>
                <div className="time-quize">
                  <p className="failed">Failed</p>
                  <div>
                    <span>14</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="complaints">
              <h2> Last Complaints</h2>
              <div className="Complaints-infos flex justify-between mt-2">
                <div className="reason leading-none">
                  <p>I had a medical appo hhhfhhfhfhfhfh</p>
                  <span>Java TD - 04 Sep 2019</span>
                </div>
                <div className="icons-reason flex">
                  <IoMdCheckmark className="fill-green-500 cursor-pointer mr-1" />
                  <FaRegHandPaper className="fill-red-500 cursor-pointer" />
                </div>
              </div>
              <div className="Complaints-infos flex justify-between mt-2">
                <div className="reason leading-none">
                  <p>I had a medical appo...</p>
                  <span>Java TD - 04 Sep 2019</span>
                </div>
                <div className="icons-reason flex">
                  <IoMdCheckmark className="fill-green-500 cursor-pointer mr-1" />
                  <FaRegHandPaper className="fill-red-500 cursor-pointer" />
                </div>
              </div>
              <div className="Complaints-infos flex justify-between mt-2">
                <div className="reason leading-none">
                  <p>I had a medical appo...</p>
                  <span>Java TD - 04 Sep 2019</span>
                </div>
                <div className="icons-reason flex">
                  <IoMdCheckmark className="fill-green-500 cursor-pointer mr-1" />
                  <FaRegHandPaper className="fill-red-500 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="last-weeek">
              <h2>Last week</h2>
              <table className="table-last-weeek">
                <tr>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
                <tr>
                  <td>
                    <div className="div-last">
                      <IoMdCheckmark />
                    </div>
                  </td>

                  <td>
                    <div className="div-last">
                      <RxCross1 />
                    </div>
                  </td>

                  <td>
                    <div className="div-last">
                      <BsDashLg />
                    </div>
                  </td>

                  <td>
                    <div className="div-last">
                      <BsDashLg />
                    </div>
                  </td>

                  <td>
                    <div className="div-last">
                      <BsDashLg />
                    </div>
                  </td>

                  <td>
                    <div className="div-last">
                      <RxCross1 />
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;
