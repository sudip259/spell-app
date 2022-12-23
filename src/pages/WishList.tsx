import { useGetSpellDetailsQuery } from "app/services/room";
import React, { useEffect, useState } from "react";
import { Button, Card, Spin, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import SpellDetails from "components/SpellDetails";
import { useDispatch, useSelector } from "react-redux";
import { spellStage } from "app/features/room/roomSlice";
import { SPELL } from "constants/index";
import { useGetWishQuery, useRemoveWishMutation } from "app/services/wishList";
import { DeleteFilled, SyncOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  url: string;
  index: string;
}

const WatchList: React.FC = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]); // initially no rows have their accordion panels expanded
  const dispatch = useDispatch<any>();
  const spellState = useSelector((state: any) => state.room.spell.data);

  const { data: allDetails, isFetching: detailsLoading } =
    useGetSpellDetailsQuery({
      params: {
        index: spellState,
      },
    });

  const {
    refetch,
    data: wishList,
    isFetching: wishListLoading,
  } = useGetWishQuery({});
  const [removeWish, { isLoading: removeWishLoading }] =
    useRemoveWishMutation();

  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "URL", dataIndex: "url", key: "age" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Button
            disabled={removeWishLoading}
            type="primary"
            danger
            style={{ cursor: "pointer" }}
            icon={
              removeWishLoading ? (
                <SyncOutlined spin={removeWishLoading} />
              ) : (
                <DeleteFilled style={{ color: "white" }} />
              )
            }
            onClick={async () => {
              await removeWish(record?.key).then(() => {
                refetch();
              });
            }}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];

  const handleExpand = (expanded: boolean, record: DataType) => {
    // if the row is being expanded, set the expanded row keys to the key of the expanded row
    // if the row is being collapsed, set the expanded row keys to an empty array
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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
          scroll={{ x: true, y: "100%" }}
          loading={{
            indicator: (
              <div>
                <Spin />
              </div>
            ),
            spinning: wishListLoading,
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
          dataSource={wishList?.map((item: any) => ({
            ...item?.json_data,
            key: item?.id,
          }))}
          pagination={{ showSizeChanger: false, pageSize: 12 }}
        />
      </Card>
    </>
  );
};

export default WatchList;
