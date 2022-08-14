import React, { Component } from 'react';
import { i18n } from '@/utils/i18n';
class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timeText: '',
      timeChange: {},
      timeCount: this.props.timeCount,
    };
  }
  componentWillMount() {
    this.state.timeChange = setInterval(this.clock, 1000);
  }
  componentWillUnmount() {
    this.state.timeChange && clearInterval(this.state.timeChange);
  }
  //关键在于用ti取代time进行计算和判断，因为time在render里不断刷新，但在方法中不会进行刷新
  clock = () => {
    let ti = this.state.time;
    let count = this.state.timeCount;
    if (ti < count) {
      //当ti>0时执行更新方法
      ti = ti + 1;
      this.setState({
        time: ti,
        timeText: ti + ' ' + i18n.formatMessage({ id: 'home.left_time' }),
      });
    } else {
      this.setState({
        time: 1,
        timeText: `1 ${i18n.formatMessage({ id: 'home.left_time' })}`,
      });
    }
  };
  render() {
    return <span style={{ marginLeft: '28px', fontSize: '13px' }}>{this.state.timeText}</span>;
  }
}

export default CountDown;
