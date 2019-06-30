import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,

} from "bizcharts";
import DataSet from "@antv/data-set";
class Curved extends React.Component {
  render() {

    //  let data=[{"time":"1","count":0},{"time":"2","count":0},{"time":"3","count":10},{"time":"4","count":0},{"time":"5","count":0},{"time":"6","count":10},{"time":"7","count":0}]
    const { data } = this.props
    console.log('**********88888888', data)
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    const cols = {
      time: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          {/* <Axis name="month" /> */}
          <Axis
            name="count"
            label={{
              formatter: val => `${val}`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="time*count"
            size={2}
            // color={"city"}
            shape={"smooth"}
          />
          {/* <Geom
            type="point"
            position="time*count"
            size={4}
            shape={"circle"}
            // color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          /> */}
        </Chart>
      </div>
    );
  }
}

export default Curved;