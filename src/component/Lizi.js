import React from 'react';
import G6 from '@antv/g6';
import * as d3 from 'd3';
import { Button } from 'antd';
import { i18n } from '@/utils/i18n';
// var ParticleTransport
class Lizi extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { count } = this.props;
    console.log('componentDidMount count', count);
    let peersCount = parseInt(count);
    console.log('peersCount', peersCount);
    new ParticleTransport({ count: peersCount });
    console.log('画布gap度', window.innerHeight);
  }
  render() {
    return <div id="mountNode"></div>;
  }
}
var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var _d = d3,
  forceSimulation = _d.forceSimulation,
  forceManyBody = _d.forceManyBody,
  forceCollide = _d.forceCollide;

var Util = G6.Util;

var ParticleTransport = (function() {
  function ParticleTransport(options) {
    console.log('ParticleTransport options', options);
    _classCallCheck(this, ParticleTransport);

    this.options = _extends(
      {
        getGravitys: function getGravitys(graph) {
          var colors = [
            '#FD8C3D',
            '#D83F43',
            '#F7BED6',
            '#E487C7',
            '#46A848',
            '#D83F43',
            '#3B85BA',
            '#48335B',
            '#B7CDE9',
          ]; // 重力点附上颜色
          var width = graph.getWidth();
          var height = graph.getHeight();
          var padding = 60;
          var center = [width / 2, height / 2];
          var gravityCount = options.count; //节点
          var angleStep = (Math.PI * 2) / gravityCount;
          var radius = Math.min(width, height) / 2 - padding;
          var initialv = [0, -radius];
          var gravitys = [initialv];
          for (var index = 1; index < gravityCount; index++) {
            var v = Util.vec2.rotate([], initialv, [0, 0], angleStep * index);
            gravitys.push(v);
          }
          gravitys.forEach(function(gravity, index) {
            gravity[0] = center[0] + gravity[0];
            gravity[1] = center[1] + gravity[1];
            gravity[2] = colors[index];
          });
          return gravitys;
        },
      },
      options,
    );
    this.init();
  }

  _createClass(ParticleTransport, [
    {
      key: 'initGraph',
      value: function initGraph() {
        var graph = new G6.Graph({
          container: 'mountNode',
          height: window.innerHeight / 2, // 画布高
          animate: {
            update: function update(_ref) {
              var element = _ref.element,
                endKeyFrame = _ref.endKeyFrame;
              var props = endKeyFrame.props;

              element.animate(
                _extends(
                  {
                    matrix: props.matrix,
                  },
                  props.attrs,
                ),
                3000,
                'easeQuadOut',
              );
            },
          },
        });
        this.graph = graph;
      },
    },
    {
      key: 'getRandom',
      value: function getRandom(array) {
        return array[parseInt(array.length * Math.random())];
      },
    },
    {
      key: 'initData',
      value: function initData() {
        var gravitys = this.gravitys;

        var data = {
          nodes: [],
        };
        gravitys.forEach(function(gravity, index) {
          var maxCount = 20 * (index + 1);
          var minCount = 2 * (index + 1);
          var nodeCount = parseInt(Math.random() * maxCount);

          for (var _index = 0; _index < nodeCount; _index++) {
            data.nodes.push({
              size: 4 + 6 * Math.random(),
              color: gravity[2],
              gx: gravity[0],
              gy: gravity[1],
              x: gravity[0] + Math.random() * 5,
              y: gravity[1] + Math.random() * 5,
            });
          }
        });
        this.graph.read(data);
        this.data = data;
      },
    },
    {
      key: 'initSimulation',
      value: function initSimulation() {
        var nodes = this.data.nodes;

        var graph = this.graph;
        this.simulation = forceSimulation(nodes)
          .force('charge', forceManyBody())
          .force(
            'collision',
            forceCollide().radius(function(model) {
              return model.size / 2 + 2;
            }),
          )
          .on('tick', function() {
            // const alpha = 1/node.gx - node.x;
            nodes.forEach(function(node) {
              node.x += (node.gx - node.x) * 0.04;
              node.y += (node.gy - node.y) * 0.04;
            });
            graph.preventAnimate(function() {
              graph.updateNodePosition();
            });
          });
      },
    },
    {
      key: 'initGravitys',
      value: function initGravitys() {
        var getGravitys = this.options.getGravitys;

        this.gravitys = getGravitys(this.graph);
      },
    },
    {
      key: 'init',
      value: function init() {
        var _this = this;

        this.initGraph();
        this.initGravitys();
        this.initData();
        this.initSimulation();
        var graph = this.graph;
        graph.add('node', {
          label: {
            text: `${i18n.formatMessage({ id: 'home.peer_count' })}: ${_this.options.count}`,
            fontSize: 18,
          },
          x: graph.getWidth() / 2, //中间字体的位置
          y: graph.getHeight() / 2,
          style: {
            fillOpacity: 0,
            strokeOpacity: 0,
          },
        });
        setInterval(function() {
          var nodes = _this.data.nodes;

          var count = 5;
          for (var index = 0; index < count; index++) {
            var node = _this.getRandom(nodes);
            var gravity = _this.getRandom(_this.gravitys);
            graph.update(node.id, {
              gx: gravity[0],
              gy: gravity[1],
              color: gravity[2],
            });
          }
          _this.simulation.alpha(0.003).restart();
        }, 100);
      },
    },
  ]);
  return ParticleTransport;
})();
export default Lizi;
