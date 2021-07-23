import React, { useEffect, useMemo } from "react";
import { MDBDataTable } from "mdbreact";
  


function Table({ filteredData}) {
 
  const data_one = useMemo(() => filteredData, [filteredData]);
  
  const tableData = data_one;

  
  const data = {
    columns: [
      {
        label: "Agent ID",
        field: "agent_id",
        sort: "asc",
        width: 150
      },
      {
        label: "Call ID",
        field: "call_id",
        width: 270
      },
      {
          label:"Call time",
          field:"call_time",
          width:150
      }
    ],
    rows: tableData?.map((ele) => {
      return {
        agent_id: ele.agent_id,
        call_id: ele.call_id,
        call_time:ele.call_time
      };
    })
  };
  
    return <MDBDataTable striped bordered hover data={data} />;
  
  
}

export default Table;
