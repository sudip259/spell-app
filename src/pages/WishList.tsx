/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetWishQuery, useRemoveWishMutation } from "app/services/wishList";
import { DeleteFilled, SyncOutlined } from "@ant-design/icons";
import TableView from "components/TableView";

interface DataType {
  key: React.Key;
  name: string;
  url: string;
  index: string;
}

const WishList: React.FC = () => {
  // get wish list
  const {
    refetch,
    data: wishList,
    isFetching: wishListLoading,
  } = useGetWishQuery({});

  // remove from wishlist
  const [removeWish, { isLoading: removeWishLoading }] =
    useRemoveWishMutation();

  // wishlist table  columns
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

  // refetch api on each page load
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <TableView
      isDeleting={removeWishLoading}
      columns={columns}
      spinning={wishListLoading || removeWishLoading}
      dataSource={wishList?.map((item: any) => ({
        ...item?.json_data,
        key: item?.id,
      }))}
    />
  );
};

export default WishList;
