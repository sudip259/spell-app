/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, Descriptions, Empty, Spin } from "antd";

interface propsTypes {
  allDetails: any;
  detailsLoading: boolean;
}

// get details in props
const SpellDetails: React.FC<propsTypes> = ({
  allDetails,
  detailsLoading,
}: any) => {
  return (
    <Spin tip="Loading" size="large" spinning={detailsLoading}>
      <Card title={"Description"}>
        <p style={{ textAlign: "justify" }}>{allDetails?.desc?.join("")}</p>
      </Card>
      <Card title={"Higher Level"}>
        <p style={{ textAlign: "justify" }}>
          {/* render empty component if higher level value is empty */}
          {allDetails?.higher_level.length !== 0 ? (
            allDetails?.higher_level?.join("")
          ) : (
            <Empty />
          )}
        </p>
      </Card>
      <Card bordered={false}>
        <Descriptions
          title="Other Details"
          bordered
          column={{ xxl: 4, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Range">
            {allDetails?.range ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Ritual">
            {allDetails?.ritual ? "YES" : "NO"}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">
            {allDetails?.duration ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Concentration">
            {allDetails?.concentration ? "YES" : "NO"}
          </Descriptions.Item>
          <Descriptions.Item label="Casting time">
            {allDetails?.casting_time ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Level">
            {allDetails?.level ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Attack type">
            {allDetails?.attack_type ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Damage type">
            {allDetails?.damage?.damage_type?.name ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="School">
            {allDetails?.school?.name ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Components">
            {allDetails?.components.join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="Material">
            {allDetails?.material ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Damage at slot level">
            {allDetails?.damage?.damage_at_slot_level
              ? Object.values(allDetails?.damage?.damage_at_slot_level).join(
                  ", "
                )
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Classes">
            {allDetails?.classes.length !== 0
              ? allDetails?.classes.map((item: any) => item?.name).join(", ")
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Subclasses">
            {allDetails?.subclasses.length !== 0
              ? allDetails?.subclasses.map((item: any) => item?.name).join(", ")
              : "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Spin>
  );
};

export default SpellDetails;
