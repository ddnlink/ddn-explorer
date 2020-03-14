import React from 'react';
import 'whatwg-fetch'
import $ from 'jquery';
import html2canvas from 'html2canvas';
import moment from 'moment';
import { Link } from "react-router-dom";
import { I18n } from "react-i18nify";
//import FetchStandard from '../../../service/request';
import './Assets.css';
import utils_slots from "./utils/slots";

function getSizeStr(size){
  var sizeStr = "";
  if (size < 1024) {
    sizeStr = size + "Bytes";
  } else {
    size = size / 1024;
    if (size < 1024) {
      sizeStr = size.toFixed(0) + " Kb";
    } else {
      size = size / 1024;
      if (size < 1024) {
        sizeStr = size.toFixed(2) + " Mb";
      } else {
        size = size / 1024;
        if (size < 1024) {
          sizeStr = size.toFixed(2) + " Gb";
        } else {
          size = size / 1024;
          sizeStr = size.toFixed(2) + " Tb";
        }
      }
    }
  }
  return sizeStr
}

class Assets extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        data: null,
        address: '',
      };
  
      this._downloadCertImage = this._downloadCertImage.bind(this);
    }

    componentWillMount() {
      document.title = 'Ebooker Ident';
    }
  
    componentDidMount() {
        this._loadDetailInfo();
    }
  
    _loadDetailInfo = async () => {
      var ipid = this.props.match.params.id;
      console.log('ipid: ' + ipid)
      var url = `http://${localStorage.getItem("servicePeer")}/api/evidence/list/${ipid}`
      let self = this;
      const response = await fetch(url, {
        method: 'get',
        headers: {
            "Content-Type": "application/json"
        },
      })

      const result = await response.json()
      if (result.success){
        self.setState({
          data: result.data.list[0],
          address: result.data.address
        });
        var QRCode = require('qrcode');
        var qrUrl = 'http://testnet.ebookchain.org/transactions/' + result.data.list[0].transactionId
        QRCode.toDataURL(qrUrl, function(err, imgUrl) {
            document.getElementById("imgQrCode").src = imgUrl;
        });
      }else{
        self.setState({data: null});
      }
    }
  
    _downloadCertImage() {
      var targetDom = $("#certInfo");
          var copyDom = targetDom.clone();    
          copyDom.width(targetDom.width() + "px");    
          copyDom.height(targetDom.height() + "px");
          $('body').append(copyDom);
  
      html2canvas(copyDom, {
        useCORS: true,
        logging: true,
        onrendered: function (canvas) {
          var url = canvas.toDataURL();
  
          var curDate = new Date();
          var month = curDate.getMonth() + 1;
          month = month < 10 ? "0" + month : month;
          var date = curDate.getDate();
          date = date < 10 ? "0" + date : date;
          var hour = curDate.getHours() < 10 ? "0" + curDate.getHours() : curDate.getHours();
          var minute = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
          var second = curDate.getSeconds() < 10 ? "0" + curDate.getSeconds() : curDate.getSeconds();
  
          var fileName = '认证信息_' + curDate.getFullYear() + '-' + month + '-' + date + '-' + hour + '-' + minute + '-' + second + '.png';
           
          //以下代码为下载此图片功能
          var triggerDownload = $("<a>").attr("href", url).attr("download", fileName).appendTo("body");
          triggerDownload[0].click();
          triggerDownload.remove();
          copyDom.remove();
        }
       });
    }

    render() {
      let { data, address } = this.state;
      var timeStr = "";
      var sizeStr = "";
      var userUrlStr = "";
      if(!data){
        return  <div style={{textAlign: 'center', fontSize: '18px', paddingTop: '100px'}}>
                  the Dcert you are finding is not exist
                <a href="javascript:window.location.reload();">click to refresh</a>
        </div>
      }
      userUrlStr = "senderId";
      return (
        <div style={{position:"relative", height:"1020px", width:'100%'}}> 
          <div style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}}>
              <div className="detail-content">
                <div id="certInfo" className="cert-info" style={{float: 'left'}}>
    
                  <div className="cert-item-lab" style={{marginTop: '260px'}}>{I18n.t("assets.title")}:</div>
                  <div className="cert-item-data">{data.title}</div>
    
                  <div className="cert-item-lab">{I18n.t("assets.contentHash")}:</div>
                  <div className="cert-item-data">{data.hash}</div>
    
                  <div className="cert-item-lab" >{I18n.t("assets.copyrightBelongs")}:</div>
                  <div className="cert-item-data">{address}</div> 
                  <div className="cert-item-lab">{I18n.t("assets.size")}:</div>
                  <div className="cert-item-data">{getSizeStr(data.size || 0)}</div>
    
                  {/* <div className="cert-item-lab">发布时间:</div>
                  <div className="cert-item-data">{timeStr}</div> */}
    
                  <div style={{paddingRight: '130px', marginTop: '30px'}}>
                    <div style={{float: 'left',paddingTop:"30px"}}>
                      <div className="cert-item-lab" style={{marginBottom: '15px',fontSize:"16px", color:"#666",}}>{I18n.t("assets.ipidNumber")}:</div>
                      <div className="cert-item-data" style={{fontSize:"16px",fontFamily:"arial"}}>{data.ipid}</div>
                      {/* <div className="cert-item-lab" style={{marginBottom: '15px'}}>区块链网络高度 </div>
                      <div className="cert-item-data">{data.blockHeight}</div> */}
                    </div>
                    <img id="imgQrCode" style={{float: 'right', width: '120px', height: '120px'}}/>	
                  </div>
    
                  <div style={{clear: 'both', paddingTop: '40px'}}>
                    <div style={{margin:"20px 0"}}>
                      <div className="cert-item-lab inline-div">{I18n.t("assets.author")}:</div>
                      <div className="inline-div" style={{marginLeft: '8px', color: '#666'}}>{data.author}</div>
                    </div>
                    <div>
                      <div className="cert-item-lab inline-div">{I18n.t("assets.publishTime")}: </div>
                      <div className="inline-div" style={{marginLeft: '8px', color: '#666'}}>{I18n.l(utils_slots.getRealTime(Number(data.timestamp)), { dateFormat: "date"})}</div>
                    </div>
                  </div>
    
                  <div style={{marginTop: '100px', textAlign: 'center'}}>
                    <div className="cert-item-lab" style={{marginLeft: '0px', fontSize: '10px'}}>{I18n.t("assets.transId")}: </div>
                    <div className="cert-item-lab" style={{marginLeft: '0px', fontSize: '10px'}}>{data.transactionId}</div>
                  </div>
                </div>
                <div style={{float: 'left', paddingLeft: '10px'}}>
                  <div style={{width: '250px'}}>
                    <div style={{boxShadow: '0px 2px 4px #dddddd', padding: '20px'}}>
                      <div style={{fontSize: '18px', color: '#000'}}>{I18n.t("assets.identifyInfo")}</div>
                      <div style={{fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px'}}>{I18n.t("assets.ipidNumber")}:</div>
                      <div style={{fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px', wordWrap: 'break-word'}}>{data.ipid}</div>
                      <hr style={{background: '#eeeeee', margin: '0px', padding: '0px'}}/>                      
                      <div style={{fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px'}}>{I18n.t("assets.title")}:</div>
                      <div style={{fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px',wordWrap:"break-word"}}>{data.title}&nbsp;&nbsp;&nbsp;{sizeStr}</div>                      
                      <hr style={{background: '#eeeeee', margin: '0px', padding: '0px'}}/>
                      <div style={{fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px'}}>{I18n.t("assets.author")}:</div>
                      <div style={{fontSize: '12px', color: '#2971ad', lineHeight: '21px', marginBottom: '5px'}} target="_blank">{data.author}</div>
                      <hr style={{background: '#eeeeee', margin: '0px', padding: '0px'}}/>
                      <div style={{fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px'}}>{I18n.t("assets.copyrightBelongs")}:</div>
                          <Link to={"/accounts/" + address} style={{fontSize: '12px', color: '#2971ad', lineHeight: '21px', marginBottom: '5px', wordWrap: 'break-word'}} target="_blank">{address}</Link>
                      <hr style={{background: '#eeeeee', margin: '0px', padding: '0px'}}/>
                      <div style={{fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px'}}>{I18n.t("assets.publishTime")}:</div>
                      <div style={{fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px'}}>{I18n.l(utils_slots.getRealTime(Number(data.timestamp)), { dateFormat: "date"})}</div>
                      <hr style={{background: '#eeeeee', margin: '0px', padding: '0px'}}/>
                      <div style={{fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px'}}>{I18n.t("assets.fileLink")}:</div>
                      <div style={{fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px', wordWrap: 'break-word'}}><a href={data.url} target="_blank">{data.url}</a></div>                    
                      <div style={{textAlign: 'center'}}>
                        <button style={{background: '#044a84', color: 'white', border: 'none', borderRadius: '2px', marginTop: '15px', width: '124px', lineHeight: '32px'}} onClick={this._downloadCertImage}>{I18n.t("assets.downloadDcert")}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{clear: 'both'}}></div>
              </div>
          </div>
        </div>
        );
    }
  
  }

export default Assets;
