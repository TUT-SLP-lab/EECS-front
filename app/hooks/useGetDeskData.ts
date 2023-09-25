import { useEffect, useState } from "react";
import axios from "axios";

export const useGetDeskData = () => {
  const [deskData, setDeskData] = useState<DeskDataType[]>([]);
  const [isAPIWaiting, setIsSPIWaiting] = useState<boolean>(false);

  // useEffect(() => {
  //   (async() => {
  //       const url = "http://api";
  //       const response = await axios
  //       .get(url)
  //       .then((res) => res)
  //       .catch((error) => error);
  //       console.log(response);
  //   })
  // }, []);
  useEffect(() => {
    const tmpDeakData: DeskDataType[] = [
      {
        roomID: "F-301",
        deskID: "111",
        email: undefined,
        username: undefined,
        locateX: 10,
        locateY: 10,
        deskHeight: 100,
        deskWidth: 100,
        timestamp: "aaa",
      },
      {
        roomID: "F-301",
        deskID: "111",
        email: undefined,
        username: undefined,
        locateX: 60,
        locateY: 10,
        deskHeight: 200,
        deskWidth: 100,
        timestamp: "aaa",
      },
      {
        roomID: "F-310",
        deskID: "111",
        email: undefined,
        username: undefined,
        locateX: 60,
        locateY: 10,
        deskHeight: 200,
        deskWidth: 100,
        timestamp: "aaa",
      },
      {
        roomID: "F-301",
        deskID: "111",
        email: undefined,
        username: "あいう",
        locateX: 200,
        locateY: 10,
        deskHeight: 200,
        deskWidth: 100,
        timestamp: "aaa",
      },
      {
        roomID: "F-310",
        deskID: "111",
        email: undefined,
        username: undefined,
        locateX: 200,
        locateY: 100,
        deskHeight: 50,
        deskWidth: 50,
        timestamp: "aaa",
      },
    ];
    setDeskData([...tmpDeakData]);
  }, []);

  return { deskData, setDeskData };
};
