import { useModalState } from "@/hooks/useModalState";
import { useEffect, useState } from "react";
import Room from "../canvas-object/Room";
import { useDeskState } from "@/hooks/useDeskState";
import Modal from "../canvas-object/modal/Modal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const MainView = () => {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [changeDeskID, setChangeDeskID] = useState("");
  const { deskDatas, changeSitDesk, changeStandDesk } = useDeskState();
  const [selectedTab, setSelectedTab] = useState(0);

  const targetDesk = (desk_id: string) => {
    setChangeDeskID(desk_id);
  };

  const handleTabSelect = (index: number) => {
    setSelectedTab(index);
    localStorage.setItem("selectedTab", index.toString());
  };

  useEffect(() => {
    const storedTab = localStorage.getItem("selectedTab");
    setSelectedTab(parseInt(storedTab ?? "0"));
  }, []);

  return (
    <div className="p-1">
      <div>EECS</div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        changeDeskID={changeDeskID}
        changeSitDesk={changeSitDesk}
      />
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>F-301</Tab>
          <Tab>F-310</Tab>
        </TabList>
        <TabPanel>
          <Room
            roomNumber={"f-301"}
            width={640}
            height={740}
            deskDatas={deskDatas}
            changeSitDesk={changeSitDesk}
            changeStandDesk={changeStandDesk}
            openModal={openModal}
            targetDesk={targetDesk}
          />
        </TabPanel>
        <TabPanel>
          <Room
            roomNumber={"f-310"}
            width={650}
            height={750}
            deskDatas={deskDatas}
            changeSitDesk={changeSitDesk}
            changeStandDesk={changeStandDesk}
            openModal={openModal}
            targetDesk={targetDesk}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};
