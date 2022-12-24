/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // context holder
  const [api, contextHolder] = notification.useNotification();

  // disable checkbox once it's clicked
  const [loading, setLoading] = useState(false);

  // get spells
  const { refetch, data, isFetching } = useSpellQuery({});

  // reomove wishlist
  const [wishList] = useWishMutation();

  // get wishlist
  const {
    refetch: refetchWish,
    data: wishListData,
    isFetching: wishListFetching,
  } = useGetWishQuery({});

  // refetch wishlist api on each page load
  useEffect(() => {
    refetchWish();
  }, [refetchWish]);

  // refetch spells on each page load
  useEffect(() => {
    refetch();
  }, [refetch]);

  // spells list columns
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
            {/* add to wishlist checkbox */}
            <Checkbox
              style={{ color: "#C70039", fontWeight: "bold" }}
              // disable checkbox if spell is already added into wish list
              disabled={_.isEqual(filtered?.json_data, record)}
              key={record?.index}
              // default checked if already added to wishlist
              defaultChecked={_.isEqual(filtered?.json_data, record)}
              onChange={(e) => {
                setLoading(true);
                onChangeWishList(e, record);
              }}
            >
              Add to wish list
            </Checkbox>
          </>
        );
      },
    },
  ];

  // display notification funtion
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

  // add to wishlist if checkbox is selected
  const onChangeWishList = async (e: CheckboxChangeEvent, data: any) => {
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
      {/* context holder to display notification  */}
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
