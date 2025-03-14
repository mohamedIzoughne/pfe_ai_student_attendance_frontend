import "./Home_student.css";

import { Bell } from "lucide-react";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";

import manImage from "@/assets/images/man-438081_960_720.png";
import manImage1 from "@/assets/images/More.png";

import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineTask } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";

import { Input } from "@/components/ui/input";
// import { ComboboxDemo } from "@/components/ui/ComboboxDemo";
import manImage2 from "@/assets/images/search.png";
import { useGetTeacherDashboardData } from "@/api/UsersApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { IoHandLeftOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

const Home = () => {
  const [notifications, setNotifications] = useState(6);
  const { data: dashboardData } = useGetTeacherDashboardData(1); // Replace with actual teacherId

  const handleNotificationClick = () => {
    if (notifications > 0) {
      setNotifications(0); // Simule la lecture des notifications
    }
  };

  const scheduleData = [
    {
      day: "Monday",
      time: "08:30 - 10:15",
      courseName: "Classe GI 1 G3",
      sessionName: "Java Lecture",
      subjectName: "Java",
      color: "#FDFCE8", // Light yellow
    },
    {
      day: "Tuesday",
      time: "10:30 - 12:15",
      courseName: "Classe GI 1 G3",
      sessionName: "Java Lab",
      subjectName: "Java",
      color: "#E8FDFA", // Light cyan
    },
    {
      day: "Thursday",
      time: "10:30 - 12:15",
      courseName: "Classe GI 1 G3",
      sessionName: "Java Workshop",
      subjectName: "Java",
      color: "#FDE8FD", // Light pink
    },
    {
      day: "Friday",
      time: "16:30 - 18:15",
      courseName: "Classe GI 1 G3",
      sessionName: "Java Project",
      subjectName: "Java",
      color: "#E8E8FD", // Light blue
    },
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const hours = [
    "08:30 - 10:15",
    "10:30 - 12:15",
    "14:30 - 16:15",
    "16:30 - 18:15",
  ];

  return (
    <>
      <div className="div0 div-head">
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

      <div className="contanier-student">
        <div className="div-Table div-Table-student">
          <div className="just-title">
            <h3>Schedule</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                {days.map((day) => (
                  <th key={day} className="high-title">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, hourIndex) => (
                <tr key={hourIndex}>
                  <td className="special">{hour}</td>
                  {days.map((day, dayIndex) => {
                    const session = scheduleData.find(
                      (s) => s.day === day && s.time === hour
                    );
                    return (
                      <td key={dayIndex}>
                        {session ? (
                          <div
                            className="th-div p-2 rounded"
                            style={{ backgroundColor: session.color }}
                          >
                            <p>
                              {session.courseName} - {session.subjectName}
                            </p>
                            <h2>{session.sessionName}</h2>
                          </div>
                        ) : (
                          <button>
                            <IoAddOutline className="stroke-[#538cac] Add-Button" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="end-part end-part-2">
          <div className="header-end-part">
            <div>
              <h2>Your Subjects</h2>
              <span>{dashboardData?.totalSubjects || 0}</span>
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

        <div className="Complaint-consult">
          <div className="title">
            <h3> Complaints </h3>
            <div className="vide">
              <div className="vide-vide"></div>
            </div>
          </div>

          <div className="div-center">
            <div>
              <Input placeholder="Search Student name or id" />
              <img src={manImage2} alt="" />
            </div>
            <div className="mini-div-center">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="btn1">+</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Complaint</DialogTitle>
                      <DialogDescription>
                        Fill in the details to add a new student complaint.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="subject" className="text-right">
                          Subject
                        </label>
                        <Input id="subject" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="excuse" className="text-right">
                          Excuse
                        </label>
                        <Input id="excuse" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="session" className="text-right">
                          Session
                        </label>
                        <Input id="session" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <table className="complaints-table">
            <tr>
              <th>Subject</th>
              <th>Execuse</th>
              <th>Session</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td className="std-namee">Math</td>
              <td className="execuse">I had a medical appointement</td>
              <td className="sessionn">Java TD - 04 Sep 2019</td>
              <td>
                <div className="icons-reason flex justify-center align-middle">
                  <FiEdit3 className=" cursor-pointer mr-2" />
                  <RiDeleteBinLine className="stroke-[red] cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="std-namee">Physics</td>
              <td className="execuse">I had a medical appointement</td>
              <td className="sessionn">Java TD - 04 Sep 2019</td>
              <td>
                <div className="icons-reason flex justify-center align-middle">
                  <FiEdit3 className=" cursor-pointer mr-2" />
                  <RiDeleteBinLine className=" stroke-[red] cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="std-namee">Java</td>
              <td className="execuse">I had a medical appointement</td>
              <td className="sessionn">Java TD - 04 Sep 2019</td>
              <td>
                <div className="icons-reason flex justify-center align-middle">
                  <FiEdit3 className=" cursor-pointer mr-2" />
                  <RiDeleteBinLine className="stroke-[red] cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="std-namee">Christine Brooks</td>
              <td className="execuse">I had a medical appointement</td>
              <td className="sessionn">Java TD - 04 Sep 2019</td>
              <td>
                <div className="icons-reason flex justify-center align-middle">
                  <FiEdit3 className=" cursor-pointer mr-2" />
                  <RiDeleteBinLine className="stroke-[red] cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="std-namee">Christine Brooks</td>
              <td className="execuse">I had a medical appointement</td>
              <td className="sessionn">Java TD - 04 Sep 2019</td>
              <td>
                <div className="icons-reason flex justify-center align-middle">
                  <FiEdit3 className=" cursor-pointer mr-2" />
                  <RiDeleteBinLine className="stroke-[red] cursor-pointer" />
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
