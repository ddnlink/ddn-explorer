import React, { Component } from "react";

class HeightCount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            timeText: '',
            timeChange: {},
            timeCount:this.props.timeCount
        };
    }
    componentDidMount() {

    }

    //关键在于用ti取代time进行计算和判断，因为time在render里不断刷新，但在方法中不会进行刷新
    digitSet = (curNumber) => {
      let numberArray = ['0','1','2','3','4','5','6','7','8','9']
      let digitSet = numberArray.map((number)=>{
        let digitClass = 'digit'
        if(number === curNumber){
          digitClass = 'digit active'
        }
        if(number === (curNumber - 1).toString()){
          digitClass = 'digit previous'
        }
        return  (<div className={digitClass}>
            <div className="digit_top">
              <span className="digit_wrap">{number}</span>
            </div>
            <div className="shadow_top"></div>
            <div className="digit_bottom">
              <span className="digit_wrap">{number}</span>
            </div>
            <div className="shadow_bottom"></div>
         </div>
        )
      })
      return digitSet
    }
    numberCard = () =>{
      const { numbers } = this.props
      let numArray = numbers.toString().split("")
      let numberCard = numArray.map((value, index) => {
        return  <div className={`digit_set`}>
        {this.digitSet(value)}
      </div>
      })
      return numberCard
    }
    render() {
        const { numbers } = this.props
        return (
          <div className="dataStatistics">
            { this.numberCard() }
          </div>
        )
    }
}

export default HeightCount
