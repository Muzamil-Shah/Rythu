import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

function Charts(props) {
  const [charData, setChartData] = useState({});
  const charts = () => {
    let pudIncome = [];
    let delIncome = [];
    let canIncome = [];
    let pudDateIncome = [];
    axios
      .get("https://pudami-backend.herokuapp.com/api/orders/admin")
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          pudIncome.push(
            parseInt(
              dataObj.status === "ordered" &&
                dataObj.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
            )
          );
          delIncome.push(
            parseInt(
              dataObj.status === "delivered" &&
                dataObj.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
            )
          );
          canIncome.push(
            parseInt(
              dataObj.status === "cancelled" &&
                dataObj.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
            )
          );
          pudDateIncome.push(moment(dataObj.createAt).format("DD/MM HH:MM"));
          // console.log(dataObj);
        }
        setChartData({
          labels: pudDateIncome,
          datasets: [
            {
              label: "# Ordered",
              data: pudIncome,

              backgroundColor: ["rgb(30,2, 70, 50)"],
              borderWidth: 4,
              fill: true,
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgba(54, 162, 235, 0.2)",
            },
            {
              label: "Cancelled",
              data: canIncome,

              fill: true,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
              yAxisID: "y-axis-2",
            },
            {
              label: "# Delivered",
              data: delIncome,
              fill: true,
              backgroundColor: "rgb(0, 256, 0, 0.2)",
              borderColor: "rgba(0, 126, 0, 0.2)",

              yAxisID: "y-axis-1",
            },
            // {
            //   label: "# of No Votes",
            //   data: [1, 2, 1, 1, 2, 2],
            //   fill: false,
            //   backgroundColor: "rgb(54, 162, 235)",
            //   borderColor: "rgba(54, 162, 235, 0.2)",
            //   yAxisID: "y-axis-2",
            // },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(pudIncome, pudDateIncome);
  };

  useEffect(() => {
    charts();
  }, []);
  return (
    <div>
      <Line
        data={charData}
        options={{
          responsive: true,
          scales: {
            y: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            x: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default Charts;
