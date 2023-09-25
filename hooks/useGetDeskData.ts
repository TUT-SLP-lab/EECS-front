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

  const changeDeskData = (index:number, name:string) => {
    const tmpDeskData = deskData;
    tmpDeskData[index].username = name;
    console.log(tmpDeskData)
    setDeskData(tmpDeskData)
  }

  useEffect(() => {
    const tmpDeakData: DeskDataType[] = [
      {
        room: "F-301",
        desk_id: "111",
        email: undefined,
        username: undefined,
        position:{x:10,y:10},
        size:{x:100,y:100},
        timestamp:{createdAt:"aaa",updatedAt:"bbb"}
      },
      {
        room: "F-301",
        desk_id: "111",
        email: undefined,
        username: undefined,
        position:{x:100,y:500},
        size:{x:50,y:100},
        timestamp:{createdAt:"aaa",updatedAt:"bbb"}
      },
      {
        room: "F-310",
        desk_id: "111",
        email: undefined,
        username: undefined,
        position:{x:10,y:200},
        size:{x:100,y:50},
        timestamp:{createdAt:"aaa",updatedAt:"bbb"}
      },
      {
        room: "F-301",
        desk_id: "111",
        email: undefined,
        username: undefined,
        position:{x:10,y:300},
        size:{x:100,y:100},
        timestamp:{createdAt:"aaa",updatedAt:"bbb"}
      },
      {
        room: "F-310",
        desk_id: "111",
        email: undefined,
        username: undefined,
        position:{x:400,y:10},
        size:{x:100,y:100},
        timestamp:{createdAt:"aaa",updatedAt:"bbb"}
      },
    ];
    setDeskData([...tmpDeakData]);
  }, []);

  return { deskData, setDeskData, changeDeskData };
};
