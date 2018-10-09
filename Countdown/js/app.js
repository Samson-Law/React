import React from "react";
import ReactDOM from 'react-dom';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time1: [],
            time2: [],
            seconds: this.props.remainingSecond,
            animation: true
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }
    startTimer() {
      if(this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time1: this.realTime(seconds),
            time2: this.realTime(seconds-1),
            seconds: seconds,
            animation: true
        });
        if(seconds == 0) { 
            clearInterval(this.timer);
            this.setState({
                animation: false
            });
            setTimeout(function(){
                this.props.onComplete();
            }.bind(this),500);
        }
    }
    realTime(secs) {
        let hours = Math.floor(secs / (60 * 60)),
            minutes = Math.floor(secs % (60 * 60) / 60),
            seconds = Math.ceil(secs % 60);
        let obj = {
            HH: hours < 10 ? "0" + hours : hours,
            MM: minutes < 10 ? "0" + minutes : minutes,
            SS: seconds < 10 ? "0" + seconds : seconds
        };
        let digital = {
            Hd1: obj.HH.toString().split('')[0],
            Hd2: obj.HH.toString().split('')[1],
            Md1: obj.MM.toString().split('')[0],
            Md2: obj.MM.toString().split('')[1],
            Sd1: obj.SS.toString().split('')[0],
            Sd2: obj.SS.toString().split('')[1]
        };
        return digital; 
    }
    slideup(current, updates) {
        let slideupClass = '';
        if(current == updates || this.state.animation == false)
            slideupClass = '';
        else
            slideupClass = 'sliding-up';
        return slideupClass;
    }
    componentDidMount() {
        let maxSecondTime = 360000,
            seconds = this.state.seconds >= maxSecondTime ? maxSecondTime-1 : this.state.seconds,
            timeVar1 = this.realTime(seconds),
            timeVar2 = this.realTime(seconds-1);
        this.setState({
            time1: timeVar1,
            time2: timeVar2,
            seconds: seconds,
            animation: true
        });
        this.startTimer();
    }
    render() {  
        return (
            <div id='countdown'>
                <div className='hours'>
                    <div className={'d1 ' + this.slideup(this.state.time1.Hd1, this.state.time2.Hd1)}>
                        <div>{this.state.time1.Hd1}</div>
                        <div>{this.state.time2.Hd1}</div>
                    </div>
                    <div className={'d2 ' + this.slideup(this.state.time1.Hd2,this.state.time2.Hd2)}>
                        <div>{this.state.time1.Hd2}</div>
                        <div>{this.state.time2.Hd2}</div>
                    </div>
                </div>
                <div className='tick'>:</div>
                <div className='minutes'>
                    <div className={'d1 ' + this.slideup(this.state.time1.Md1, this.state.time2.Md1)}>
                        <div>{this.state.time1.Md1}</div>
                        <div>{this.state.time2.Md1}</div>
                    </div>
                    <div className={'d2 ' + this.slideup(this.state.time1.Md2,this.state.time2.Md2)}>
                        <div>{this.state.time1.Md2}</div>
                        <div>{this.state.time2.Md2}</div>
                    </div>
                </div>
                <div className='tick'>:</div>
                <div className='seconds'>
                    <div className={'d1 ' + this.slideup(this.state.time1.Sd1, this.state.time2.Sd1)}>
                        <div>{this.state.time1.Sd1}</div>
                        <div>{this.state.time2.Sd1}</div>
                    </div>
                    <div className={'d2 ' + this.slideup(this.state.time1.Sd2,this.state.time2.Sd2)}>
                        <div>{this.state.time1.Sd2}</div>
                        <div>{this.state.time2.Sd2}</div>
                    </div>
                </div> 
            </div>
        );
    } 
};

class App extends React.Component {
    render() {
        let number = 240;
        return <Countdown remainingSecond={number} onComplete={() => alert("Done")}/>;
    }
};

export default App;

ReactDOM.render(<App/>, document.getElementById('app'));