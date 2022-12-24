import { useGetSpellDetailsQuery } from "app/services/room";
import React, { useState } from "react";
import { Card, Spin, Table } from "antd";
import SpellDetails from "components/SpellDetails";
import { useDispatch, useSelector } from "react-redux";
import { spellStage } from "app/features/room/roomSlice";
import { SPELL } from "constants/index";

interface DataType {
  key: React.Key;
  name: string;
  url: string;
  index: string;
}

const TableView: React.FC<any> = ({
  columns,
  spinning,
  dataSource,
  isDeleting,
}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]); // initially no rows have their accordion panels expanded
  //
  const dispatch = useDispatch<any>();
  const spellState = useSelector((state: any) => state.room.spell.data);

  const { data: allDetails, isFetching: detailsLoading } =
    useGetSpellDetailsQuery({
      params: {
        index: spellState,
      },
    });

  const handleExpand = (expanded: boolean, record: DataType) => {
    // if the row is being expanded, set the expanded row keys to the key of the expanded row
    // if the row is being collapsed, set the expanded row keys to an empty array
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  return (
    <>
      <Card
        style={{
          borderRadius: "0px",
          borderBottom: "0.5px solid gray",
        }}
        bordered={false}
      ></Card>
      <Card
        style={{
          width: "100%",
          overflow: "scroll",
          backgroundColor: "#eae6e6",
        }}
        className="card"
        bordered={false}
      >
        <Table
          scroll={{ x: true }}
          loading={{
            indicator: (
              <div>
                <Spin tip={isDeleting ? "Deleting" : ""} />
              </div>
            ),
            spinning: spinning,
          }}
          columns={columns}
          expandable={{
            onExpand: (expanded, record) => {
              handleExpand(expanded, record);
              if (expanded) {
                // Fetch additional data for the expanded row
                dispatch(spellStage({ stage: SPELL, data: record?.index }));
              }
            },
            expandedRowRender: () => {
              return (
                <Card
                  bodyStyle={{ backgroundColor: "#eae6e6" }}
                  bordered={true}
                >
                  <SpellDetails
                    allDetails={allDetails}
                    detailsLoading={detailsLoading}
                  />
                </Card>
              );
            },
            expandedRowKeys, // only expand the row whose key is in this array
          }}
          dataSource={dataSource}
          pagination={{ showSizeChanger: false, pageSize: 10 }}
        />
      </Card>
    </>
  );
};

export default TableView;
