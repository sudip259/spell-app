import { Checkbox, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useSpellQuery } from "app/services/room";
import { useGetWishQuery, useWishMutation } from "app/services/wishList";
import TableView from "components/TableView";
import React, { useEffect, useState } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { ColumnsType } from "antd/es/table";
import _ from "lodash";

interface DataType {
  key: React.Key;
  name: string;
  url: string;
  index: string;
}

export default function SpellList() {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const { refetch, data, isFetching } = useSpellQuery({});
  const [wishList] = useWishMutation();

  const {
    refetch: refetchWish,
    data: wishListData,
    isFetching: wishListFetching,
  } = useGetWishQuery({});

  useEffect(() => {
    refetchWish();
  }, [refetchWish]);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
              style={{ color: "#C70039", fontWeight: "bold" }}
              disabled={_.isEqual(filtered?.json_data, record)}
              key={record?.index}
              defaultChecked={_.isEqual(filtered?.json_data, record)}
              onChange={(e) => {
                setLoading(true);
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

  const onChangeWatchLater = async (e: CheckboxChangeEvent, data: any) => {
    e.preventDefault();
    try {
      if (e.target.checked) {
        await wishList({ data })
          .unwrap()
          .then((res) => {
            setLoading(false);
            openNotification("bottomRight", res);
            refetchWish();
            refetch();
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {contextHolder}
      <TableView
        columns={columns}
        spinning={isFetching || wishListFetching || loading}
        dataSource={data?.results.map((item: any) => ({
          ...item,
          key: item.index,
        }))}
      />
    </>
  );
}
