import React from 'react';
import 'whatwg-fetch'
import $ from 'jquery';
import html2canvas from 'html2canvas';
import moment from 'moment';
import { Link } from "react-router-dom";
import { formatMessage } from 'umi-plugin-locale';
import styles from './index.less';
import utils_slots from "../../utils/slots";
import { message } from 'antd'
import { connect } from 'dva';
function getSizeStr(size) {
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

@connect(({ assert }) => ({
	certificate: assert.certificate
}))

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
		var params = this.props.match.params.id;
		// console.log('ipid: ' + ipid)
		/*	var url = `http://47.92.0.84:8001/api/evidence/list/${ipid}`
			let self = this;
			const response = await fetch(url, {
				method: 'get',
				headers: {
					"Content-Type": "application/json"
				},
			})

			const result = await response.json()*/
		this.props.dispatch({
			type: 'assert/getCertificate',
			payload: {
				...params
			},
			callback: (res) => {
				console.log('certificate',res)
				if (res.success !== true) {
					message.error(res.error)
				} else {
					var QRCode = require('qrcode');
					var qrUrl = 'http://testnet.ebookchain.org/transactions/' + res.data.list[0].transactionId
					QRCode.toDataURL(qrUrl, function (err, imgUrl) {
						document.getElementById("imgQrCode").src = imgUrl;
					});
				}
			}
		});
		/*if (result.success) {
			self.setState({
				data: result.data.list[0],
				address: result.data.address
			});
			var QRCode = require('qrcode');
			var qrUrl = 'http://testnet.ebookchain.org/transactions/' + result.data.list[0].transactionId
			QRCode.toDataURL(qrUrl, function (err, imgUrl) {
				document.getElementById("imgQrCode").src = imgUrl;
			});
		} else {
			self.setState({ data: null });
		}*/
	}

	_downloadCertImage() {
		var targetDom = $("#certInfo");
		var copyDom = targetDom.clone();
		copyDom.width(targetDom.width() + "px");
		copyDom.height(targetDom.height() + "px");
		$('body').append(copyDom);
		console.log("$('body')", $('body'))
		console.log('************', copyDom)

		html2canvas(copyDom, {
			useCORS: true,
			logging: true,
			onrendered: function (canvas) {
				console.log('******************jinru onrender')
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
		// const { data, address } = this.state;
		const { certificate } = this.props
		const { address } = certificate;
		var timeStr = "";
		var sizeStr = "";
		var userUrlStr = "";
		if (!certificate) {
			return <div style={{ textAlign: 'center', fontSize: '18px', paddingTop: '100px' }}>
				the Dcert you are finding is not exist
                <a href="javascript:window.location.reload();">click to refresh</a>
			</div>
		}
    userUrlStr = "senderId";

		return (
			<div style={{ position: "relative", height: "1020px", width: '100%' }}>
				<div style={{ top: "0", left: "0", right: "0", bottom: "0" }}>
					<div className={styles["detail-content"]}>
						<div id="certInfo" className={styles["cert-info"]} style={{ float: 'left' }}>

							<div className={styles["cert-item-lab"]} style={{ marginTop: '260px' }}>{formatMessage({ id: "assets.title" })}:</div>
							<div className={styles["cert-item-data"]}>{certificate.title}</div>

							<div className={styles["cert-item-lab"]}>{formatMessage({ id: "assets.contentHash" })}:</div>
							<div className={styles["cert-item-data"]}>{certificate.hash}</div>

							<div className={styles["cert-item-lab"]}>{formatMessage({ id: "assets.copyrightBelongs" })}:</div>
							<div className={styles["cert-item-data"]}>{address}</div>
							<div className={styles["cert-item-lab"]}>{formatMessage({ id: "assets.size" })}:</div>
							<div className={styles["cert-item-data"]}>{getSizeStr(certificate.size || 0)}</div>

							{/* <div className="cert-item-lab">发布时间:</div>
                  <div className="cert-item-data">{timeStr}</div> */}

							<div style={{ paddingRight: '130px', marginTop: '30px' }}>
								<div style={{ float: 'left', paddingTop: "30px" }}>
									<div className={styles["cert-item-lab"]} style={{ marginBottom: '15px', fontSize: "16px", color: "#666", }}>{formatMessage({ id: "assets.ipidNumber" })}:</div>
									<div className={styles["cert-item-data"]} style={{ fontSize: "16px", fontFamily: "arial" }}>{certificate.ipid}</div>
									{/* <div className="cert-item-lab" style={{marginBottom: '15px'}}>区块链网络高度 </div>
                      <div className="cert-item-data">{certificate.blockHeight}</div> */}
								</div>
								<img id="imgQrCode" style={{ float: 'right', width: '120px', height: '120px' }} />
							</div>

							<div style={{ clear: 'both', paddingTop: '40px', marginLeft: '98px' }}>
								<div style={{ margin: "20px 0" }}>
									<span className={styles["cert-item-lab inline-div"]}>{formatMessage({ id: "assets.author" })}:</span>
									<span className={styles["inline-div"]} style={{ marginLeft: '8px', color: '#666' }}>{certificate.author}</span>
								</div>
								<div>
									<span className={styles["cert-item-lab inline-div"]}>{formatMessage({ id: "assets.publishTime" })}: </span>
									<span className={styles["inline-div"]} style={{ marginLeft: '8px', color: '#666' }}>
										{/* {I18n.l(utils_slots.getRealTime(Number(certificate.timestamp)), { dateFormat: "date"})} */}
										{moment(utils_slots.getRealTime(Number(certificate.timestamp))).format('YYYY-MM-DD HH:mm:ss')}
									</span>
								</div>
							</div>

							<div style={{ marginTop: '100px', textAlign: 'center' }}>
								<div className={styles["cert-item-lab"]} style={{ marginLeft: '0px', fontSize: '10px' }}>{formatMessage({ id: "assets.transId" })}: </div>
								<div className={styles["cert-item-lab"]} style={{ marginLeft: '0px', fontSize: '10px' }}>{certificate.transactionId}</div>
							</div>
						</div>
						<div style={{ float: 'left', paddingLeft: '10px' }}>
							<div style={{ width: '250px' }}>
								<div style={{ boxShadow: '0px 2px 4px #dddddd', padding: '20px' }}>
									<div style={{ fontSize: '18px', color: '#000' }}>{formatMessage({ id: "assets.identifyInfo" })}</div>
									<div style={{ fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px' }}>{formatMessage({ id: "assets.ipidNumber" })}:</div>
									<div style={{ fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px', wordWrap: 'break-word' }}>{certificate.ipid}</div>
									<hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
									<div style={{ fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px' }}>{formatMessage({ id: "assets.title" })}:</div>
									<div style={{ fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px', wordWrap: "break-word" }}>{certificate.title}&nbsp;&nbsp;&nbsp;{sizeStr}</div>
									<hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
									<div style={{ fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px' }}>{formatMessage({ id: "assets.author" })}:</div>
									<div style={{ fontSize: '12px', color: '#2971ad', lineHeight: '21px', marginBottom: '5px' }} target="_blank">{certificate.author}</div>
									<hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
									<div style={{ fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px' }}>{formatMessage({ id: "assets.copyrightBelongs" })}:</div>
									<Link to={"/accounts/" + address} style={{ fontSize: '12px', color: '#2971ad', lineHeight: '21px', marginBottom: '5px', wordWrap: 'break-word' }} target="_blank">{address}</Link>
									<hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
									<div style={{ fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px' }}>{formatMessage({ id: "assets.publishTime" })}:</div>
									<div style={{ fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px' }}>
										{/* {I18n.l(utils_slots.getRealTime(Number(certificate.timestamp)), { dateFormat: "date"})} */}
										{moment(utils_slots.getRealTime(Number(certificate.timestamp))).format('YYYY-MM-DD HH:mm:ss')}
									</div>
									<hr style={{ background: '#eeeeee', margin: '0px', padding: '0px' }} />
									<div style={{ fontSize: '12px', color: '#999999', lineHeight: '21px', marginTop: '15px' }}>{formatMessage({ id: "assets.fileLink" })}:</div>
									<div style={{ fontSize: '12px', color: '#666666', lineHeight: '21px', marginBottom: '5px', wordWrap: 'break-word' }}><a href={certificate.url} target="_blank">{certificate.url}</a></div>
									<div style={{ textAlign: 'center' }}>
										<button style={{ background: '#044a84', color: 'white', border: 'none', borderRadius: '2px', marginTop: '15px', width: '124px', lineHeight: '32px' }} onClick={this._downloadCertImage}>{formatMessage({ id: "assets.downloadDcert" })}</button>
									</div>
								</div>
							</div>
						</div>
						<div style={{ clear: 'both' }}></div>
					</div>
				</div>
			</div>
		);
	}

}

export default Assets;
