// import React from "react";
// import {
//   G2,
//   Chart,
//   Geom,
//   Axis,
//   Tooltip,
//   Coord,
//   Label,
//   Legend,
//   View,
//   Guide,
//   Shape,
//   Facet,
//   Util
// } from "bizcharts";
// import DataSet from "@antv/data-set";

// class Donut extends React.Component {
//   render() {
//     const { DataView } = DataSet;
//     const { typeData } = this.props
//     typeData.map(item=>{
//       item.item=item.type
//     })
//     console.log('bingtu**********',typeData)
//     const { Html } = Guide;
//     const data = [

//       {
//         item: "事例二",
//         count: 21
//       },
//       {
//         item: "事例三",
//         count: 17
//       }
//       ,
//       {
//         item: "事例4",
//         count: 17
//       }
//     ];
//     const dv = new DataView();
//     dv.source(data).transform({
//       type: "percent",
//       field: "count",
//       dimension: "type",
//       as: "percent"
//     });
//     const cols = {
//       percent: {
//         formatter: val => {
//           val = val * 100 + "%";
//           return val;
//         }
//       }
//     };
//     return (
//       <div>
//         <Chart
//           height={window.innerHeight}
//           data={dv}
//           scale={cols}
//           padding={[80, 100, 80, 80]}
//           forceFit
//         >
//           <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
//           <Axis name="percent" />
//           <Legend
//             position="right"
//             offsetY={-window.innerHeight / 2 + 120}
//             offsetX={-100}
//           />
//           <Tooltip
//             showTitle={false}
//             itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
//           />
//           {/* <Guide>
//             <Html
//               position={["50%", "50%"]}
//               html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
//               alignX="middle"
//               alignY="middle"
//             />
//           </Guide> */}
//           <Geom
//             type="intervalStack"
//             position="percent"
//             color="item"
//             tooltip={[
//               "item*percent",
//               (item, percent) => {
//                 percent = percent * 100 + "%";
//                 return {
//                   name: item,
//                   value: percent
//                 };
//               }
//             ]}
//             style={{
//               lineWidth: 1,
//               stroke: "#fff"
//             }}
//           >
//             <Label
//               content="percent"
//               formatter={(val, item) => {
//                 return item.point.item + ": " + val;
//               }}
//             />
//           </Geom>
//         </Chart>
//       </div>
//     );
//   }
// }

// export default Donut;
import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

const data = [
  {
    item: '血液通路',
    count: 40,
  },
  {
    item: '透析信息',
    count: 21,
  },
  {
    item: '医嘱信息',
    count: 17,
  },
  {
    item: '阶段小结',
    count: 13,
  }
];

class Donut extends React.Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const { typeData } = this.props;
    console.log("typeData", typeData)
    let pieData = data
    if(!typeData){
      pieData = data
    }else{
      typeData.map(item => {
        item.item = item.type;
      });
    }
    console.log("pieData", pieData)
    const dv = new DataView();
    dv.source(pieData).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100).toFixed(2) + '%';
          return val;
        },
      },
    };
    return (
      <div>
        <Chart
          height={window.innerHeight / 2}
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
        >
          <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend position="bottom" offsetY={-window.innerHeight / 2 + 500} offsetX={0} />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          {/* <Guide>
            <Html
              position={["50%", "50%"]}
              html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
              alignX="middle"
              alignY="middle"
            />
          </Guide> */}
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label //指向占比的label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ': ' + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Donut;
