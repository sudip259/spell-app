import { useGetSpellDetailsQuery, useSpellQuery } from "app/services/room";
import React, { useEffect, useState } from "react";
import { Card, Checkbox, notification, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import SpellDetails from "components/SpellDetails";
import { useDispatch, useSelector } from "react-redux";
import { spellStage } from "app/features/room/roomSlice";
import { SPELL } from "constants/index";
import {
  useGetWishQuery,
  useRemoveWishMutation,
  useWishMutation,
} from "app/services/wishList";
import { NotificationPlacement } from "antd/es/notification/interface";
import _ from "lodash";

interface DataType {
  key: React.Key;
  name: string;
  url: string;
  index: string;
}

const SpellList: React.FC = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]); // initially no rows have their accordion panels expanded
  const { refetch, data, isFetching } = useSpellQuery({});
  const dispatch = useDispatch<any>();
  const spellState = useSelector((state: any) => state.room.spell.data);

  const { data: allDetails, isFetching: detailsLoading } =
    useGetSpellDetailsQuery({
      params: {
        index: spellState,
      },
    });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, res: any) => {
    api.info({
      message: `Notification`,
      description: (
        <div>
          {res?.json_data?.name
            ? res?.json_data?.name + " added to wish list"
            : res?.name + " removed from wish list"}
        </div>
      ),
      placement,
    });
  };

  const [wishList] = useWishMutation();

  const [removeWish, { isLoading: removeWishLoading }] =
    useRemoveWishMutation();

  const onChangeWatchLater = async (e: CheckboxChangeEvent, data: any) => {
    try {
      if (e.target.checked) {
        refetchWish();
        refetch();
        await wishList({ data })
          .unwrap()
          .then((res) => {
            openNotification("bottomRight", res);
          });
      } else {
        await removeWish(
          wishListData?.find(
            (item: any) => item?.json_data?.index === data?.index
          )?.id
        ).then(() => {
          openNotification("bottomRight", data);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "URL", dataIndex: "url", key: "age" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        const filtered = wishListData?.find(
          (item: any) => item?.json_data?.index === record?.index
        );

        return (
          <>
            <Checkbox
              key={record?.index}
              defaultChecked={_.isEqual(filtered?.json_data, record)}
              onChange={(e) => {
                onChangeWatchLater(e, record);
              }}
            >
              Add to wish list
            </Checkbox>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleExpand = (expanded: boolean, record: DataType) => {
    // if the row is being expanded, set the expanded row keys to the key of the expanded row
    // if the row is being collapsed, set the expanded row keys to an empty array
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const {
    refetch: refetchWish,
    data: wishListData,
    isFetching: wishListFetching,
  } = useGetWishQuery({});

  useEffect(() => {
    refetchWish();
  }, [refetchWish]);

  return (
    <>
      {contextHolder}
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
            spinning: isFetching || wishListFetching || removeWishLoading,
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
          dataSource={data?.results.map((item: any) => ({
            ...item,
            key: item.index,
          }))}
          pagination={{ showSizeChanger: false, pageSize: 12 }}
        />
      </Card>
    </>
  );
};

export default SpellList;
