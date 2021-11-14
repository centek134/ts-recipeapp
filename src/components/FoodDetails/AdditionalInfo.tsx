import React from "react";
import styled from "styled-components";

const Table = styled.table`
  margin: 0 auto;
  width: 90%;
  & > tbody > tr {
    &:hover {
      background-color: #ffffff;
      color: #000000;
    }
    & > td {
      padding: 5px 0;
    }
  }
`;
interface Props {
  nutrients: {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
  }[];
}

const AdditionalInfo = ({ nutrients }: Props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Daily Needs</th>
        </tr>
      </thead>
      <tbody>
        {nutrients?.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.name}</td>
              <td>
                {item.amount} {item.unit}
              </td>
              <td>{item.percentOfDailyNeeds}%</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AdditionalInfo;
