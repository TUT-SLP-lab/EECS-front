import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useSessionState } from "./useSessionState";

axios.defaults.withCredentials = true;

export const useDeskState = () => {
  const [deskDatas, setDeskDatas] = useState<DeskDataType[]>([]);
  const { sessionData } = useSessionState();

  useEffect(() => {
    (async () => {
      try {
        if (sessionData != undefined) {
          const authToken = sessionData.getIdToken();
          const headers = {
            Authorization: authToken.getJwtToken(),
          };
          await axios
            .get(`${process.env.NEXT_PUBLIC_APIURL}/desk`, { headers: headers })
            .then(({data}: AxiosResponse<DeskDataType[]>) => {
              setDeskDatas(data);
            })
            .catch((error) => {
              console.error("An error occurred:", error);
            });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [sessionData]);

  async function changeSitDesk(id: string) {
    if (sessionData != undefined) {
      const authToken = sessionData.getIdToken();
      const headers = {
        Authorization: authToken.getJwtToken(),
      };
      await axios
        .put(`${process.env.NEXT_PUBLIC_APIURL}/desk/${id}`,undefined, {
          headers: headers,
        })
        .then(({data}: AxiosResponse<DeskDataType>) => {
          const new_desk = data;
          changeOldDesk(new_desk);
          setDeskDatas((desks) =>
            desks.map((desk) =>
              desk.desk_id === new_desk.desk_id ? new_desk : desk
            )
          );
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  }

  async function changeStandDesk(id: string) {
    if (sessionData != undefined) {
      const authToken = sessionData.getIdToken();
      const headers = {
        Authorization: authToken.getJwtToken(),
      };
      await axios
        .delete(`${process.env.NEXT_PUBLIC_APIURL}/desk/${id}`, {
          headers: headers,
        })
        .then(({data}: AxiosResponse<DeskDataType>) => {
          const new_desk = data;
          setDeskDatas((desks) =>
            desks.map((desk) =>
              (desk.desk_id === new_desk.desk_id) ? new_desk : desk
            )
          );
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  }

  const changeOldDesk = (new_desk: DeskDataType) => {
    const {email} = new_desk;
    setDeskDatas((desks) =>
      desks.map((desk) => {
        if (desk.email === email) {
          desk.email = undefined;
          desk.username = undefined;
        }
        return desk;
      })
    );
  };

  return {
    deskDatas,
    changeSitDesk,
    changeStandDesk,
  };
};
