import "./Exams.css";
import { Bell } from "lucide-react";
import { useState } from "react";
import { ComboboxDemo } from "@/components/ui/ComboboxDemo";
import { IoMdTime } from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import manImage10 from "@/assets/images/man-438081_960_720.png";
import manImage11 from "@/assets/images/More.png";

const Exams = () => {
  const [notifications, setNotifications] = useState(6);
  const [date, setDate] = React.useState();

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
        <img className="img2" src={manImage10} alt="" />
        <div className="mini-div">
          <span>Moni Roy</span>
          <h4>Teacher</h4>
        </div>
        <img className="img3" src={manImage11} alt="" />
      </div>

      <div className="title">
        <h3> Exams </h3>
        <div className="vide">
          <div className="vide-vide"></div>
        </div>
      </div>

      <div className="buttons">
        <div className="Picker">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[190px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          {" "}
          <ComboboxDemo placeholder="Select Subject" />
        </div>
        <div>
          {" "}
          <ComboboxDemo placeholder="Select Class" />
        </div>
        <button className="btn1">+</button>
      </div>

      <div className="Principal">
        <div className="container-exams">
          <div className="carte">
            <div>
              <h5>Java</h5>
              <h1>Java exam 1</h1>
              <h5>class GI</h5>
            </div>

            <div className="two">
              <IoEllipsisHorizontal className="trois" />
              <span>1h</span>
            </div>
          </div>

          <div className="More-date">
            <p> March 10, 2024 - 14:30</p>
            <IoMdTime />
          </div>
        </div>
        
        <div className="container-exams">
        <div className="carte">
          <div>
            <h5>Subject</h5>
            <h1>Exam name</h1>
            <h5>Class</h5>
          </div>

          <div className="two">
            <IoEllipsisHorizontal className="trois" />
            <span>1h</span>
          </div>
        </div>

        <div className="More-date">
          <p> March 10, 2024 - 14:30</p>
          <IoMdTime />
        </div>
      </div>

      <div className="container-exams">
        <div className="carte">
          <div>
          <h5>Subject</h5>
            <h1>Exam name</h1>
            <h5>Class</h5>
          </div>

          <div className="two">
            <IoEllipsisHorizontal className="trois" />
            <span>1h</span>
          </div>
        </div>

        <div className="More-date">
          <p> March 10, 2024 - 14:30</p>
          <CiCircleCheck />
        </div>
      </div>

      <div className="container-exams">
        <div className="carte">
          <div>
          <h5>Subject</h5>
            <h1>Exam name</h1>
            <h5>Class</h5>
          </div>

          <div className="two">
            <IoEllipsisHorizontal className="trois" />
            <span>1h</span>
          </div>
        </div>

        <div className="More-date">
          <p> March 10, 2024 - 14:30</p>
          <CiCircleCheck />
        </div>
      </div>
      </div>
    </>
  );
};

export default Exams;
