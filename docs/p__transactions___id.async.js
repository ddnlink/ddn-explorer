(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{eHxZ:function(e,a,t){"use strict";t.r(a);t("IzEo");var s,n,c,r=t("bx4M"),l=(t("Pwec"),t("CtXQ")),o=t("d6i3"),i=t.n(o),m=(t("miYZ"),t("tsqr")),_=t("p0pE"),d=t.n(_),p=t("1l/V"),N=t.n(p),E=t("q1tI"),g=t.n(E),h=t("LLXN"),w=t("yusu"),v=t("i2mF"),f=t.n(v),u=t("wd/R"),b=t.n(u),O=t("MuoO"),M=(t("20nU"),s=Object(O["connect"])(e=>{var a=e.transaction;return{transaction:a}}),s((c=class extends E["Component"]{constructor(e){var a;super(e),a=this,this.getBlocks=N()(i.a.mark(function e(){var t,s=arguments;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=s.length>0&&void 0!==s[0]?s[0]:{},console.log("zheshijiaoyiid",t),a.setState({loading:!0}),a.props.dispatch({type:"transaction/getOneTransDetail",payload:d()({},t),callback:e=>{!0!==e.success&&m["a"].error(e.error),a.setState({loading:!1})}});case 4:case"end":return e.stop()}},e)})),this.state={loading:!1,params:null}}componentDidMount(){var e=this.props.match.params;this.getBlocks(e)}render(){var e=this.props.transaction,a="{}"!==JSON.stringify(e.oneTransDetail)?e.oneTransDetail:null;return console.log("000000000000000000000",e.oneTransDetail,a),a?g.a.createElement("div",{className:f.a.pageWrap},g.a.createElement(r["a"],{title:g.a.createElement("div",{className:f.a.cardText},g.a.createElement(l["a"],{className:f.a["icon"],type:"transaction"}),Object(h["formatMessage"])({id:"trs.trs_detail"}))},g.a.createElement("div",{className:f.a["content"]},g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.height"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.height)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.blockid"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.blockId)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.type"})),g.a.createElement("span",{className:f.a["col_two"]},Object(h["formatMessage"])({id:"types."+a.transaction.type}))),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.timestamp"})),g.a.createElement("span",{className:f.a["col_two"]},b()(w["a"].getRealTime(Number(a.transaction.timestamp))).format("YYYY-MM-DD HH:mm:ss"))),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.senderPublicKey"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.senderPublicKey)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.senderAddress"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.senderId)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.receipientAddress"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.recipientId)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.signature"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.signature)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.signSignature"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.signSignature)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.confirmations"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.confirmations)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.args"})),g.a.createElement("span",{className:f.a["col_two"]},Array.isArray(a.transaction.args)?a.transaction.args.join(","):a.transaction.args)),g.a.createElement("div",{className:f.a["content_d"]},g.a.createElement("span",{className:f.a["col_one"]},Object(h["formatMessage"])({id:"trs.message"})),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.message))),a.transaction.asset.article&&g.a.createElement("div",{className:f.a["footer"]},g.a.createElement("div",{className:f.a["left"]},"\u4ea4\u6613\u5185\u5bb9"),g.a.createElement("div",{className:f.a["right"]},g.a.createElement("div",{className:f.a["right_content"]},g.a.createElement("span",{className:f.a["col_one"]},"\u6587\u4ef6\u540d\u79f0:"),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.asset.article.title)),g.a.createElement("div",{className:f.a["right_content"]},g.a.createElement("span",{className:f.a["col_one"]},"\u5185\u5bb9hash:"),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.asset.article.fileHash)),g.a.createElement("div",{className:f.a["right_content"]},g.a.createElement("span",{className:f.a["col_one"]},"\u521b\u4f5c:"),g.a.createElement("span",{className:f.a["col_two"]},a.transaction.asset.article.filename)),g.a.createElement("div",{className:f.a["right_content"]},g.a.createElement("span",{className:f.a["col_one"]},"\u63cf\u8ff0:"),g.a.createElement("span",{className:f.a["col_two"]},JSON.parse(a.transaction.asset.article.description).des)),g.a.createElement("div",{className:f.a["right_content"]},g.a.createElement("span",{className:f.a["col_one"]},"url:"),g.a.createElement("span",{className:f.a["col_two"]},JSON.parse(a.transaction.asset.article.description).url)),g.a.createElement("div",{className:f.a["right_content"],id:f.a["right_content_b"]},g.a.createElement("span",{className:f.a["col_one"]},"size:"),g.a.createElement("span",{className:f.a["col_two"]},JSON.parse(a.transaction.asset.article.description).size)))))):g.a.createElement("div",{style:{textAlign:"center",margin:"100px"}},Object(h["formatMessage"])({id:"trs.no_detail"}))}},n=c))||n);a["default"]=M},i2mF:function(e,a,t){e.exports={pageWrap:"pageWrap___10w5w",title:"title___212mP",col_one:"col_one___29H-U",content:"content___OQOu_",content_d:"content_d___2mVXW",col_two:"col_two___3Y4wi",icon:"icon___3_pzy",cardText:"cardText___3l9vC",footer:"footer___1HRQn",left:"left___2Dd9D",right:"right___3Np0N",right_content_b:"right_content_b___1--aY",right_content:"right_content___1mUsw"}}}]);