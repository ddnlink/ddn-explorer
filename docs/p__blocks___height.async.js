(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{RkzN:function(e,a,t){"use strict";t.r(a);t("IzEo");var l,c,o,s=t("bx4M"),n=(t("Pwec"),t("CtXQ")),r=t("d6i3"),m=t.n(r),d=(t("miYZ"),t("tsqr")),i=t("p0pE"),b=t.n(i),k=t("1l/V"),_=t.n(k),g=t("q1tI"),E=t.n(g),p=t("wd/R"),u=t.n(p),N=t("6YkS"),w=t("LLXN"),f=t("20nU"),h=t("yusu"),M=t("gdlp"),O=t.n(M),j=t("MuoO"),v=(l=Object(j["connect"])(e=>{var a=e.block;return{block:a}}),l((o=class extends g["Component"]{constructor(e){var a;super(e),a=this,this.getBlocks=_()(m.a.mark(function e(){var t,l=arguments;return m.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=l.length>0&&void 0!==l[0]?l[0]:{},a.setState({loading:!0}),a.props.dispatch({type:"block/getBlocksList",payload:b()({},t),callback:e=>{!0!==e.success&&d["a"].error(e.error),a.setState({blockLoading:!1})}});case 3:case"end":return e.stop()}},e)})),this.state={loading:!1,params:null}}componentDidMount(){var e=this.props.match.params;this.getBlocks(e)}render(){var e=this.props.block,a=e.data.latestBlocks;return console.log("\u533a\u5757\u94fe\u9ad8\u5ea6",e,a),"{}"===JSON.stringify(a)?E.a.createElement("div",{style:{textAlign:"center",margin:"100px"}},Object(w["formatMessage"])({id:"block.no_detail"})):0===a.blocks.length?E.a.createElement("div",{style:{textAlign:"center",margin:"100px"}},Object(w["formatMessage"])({id:"block.no_detail"})):E.a.createElement("div",{className:O.a.pageWrap},E.a.createElement(s["a"],{title:E.a.createElement("div",{className:O.a.cardText},E.a.createElement(n["a"],{className:O.a["icon"],type:"codepen"}),Object(w["formatMessage"])({id:"block.block_detail"}))},E.a.createElement("table",null,E.a.createElement("tbody",{className:O.a["blockTable"]},E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.height"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].height)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.id"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].id)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.previousBlock"})),E.a.createElement("td",{className:O.a["col_two"]},E.a.createElement(N["Link"],{to:"/blocks/".concat(a.blocks[0].height-1),target:"_blank"},a.blocks[0].previousBlock))),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.version"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].version)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.timestamp"})),E.a.createElement("td",{className:O.a["col_two"]},u()(h["a"].getRealTime(Number(a.blocks[0].timestamp))).format("YYYY-MM-DD HH:mm:ss"))),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.numberOfTransactions"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].numberOfTransactions)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.payloadLength"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].payloadLength)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.payloadHash"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].payloadHash)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.generatorPublicKey"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].generatorPublicKey)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.generatorId"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].generatorId)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.blockSignature"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].blockSignature)),E.a.createElement("tr",null,E.a.createElement("td",{className:O.a["col_one"]},Object(w["formatMessage"])({id:"block.totalForged"})),E.a.createElement("td",{className:O.a["col_two"]},a.blocks[0].totalForged/1e8," ",f["a"].coinName))))))}},c=o))||c);a["default"]=v},gdlp:function(e,a,t){e.exports={pageWrap:"pageWrap___lUoMd",blockTable:"blockTable___3s8mW",col_one:"col_one___3orxR",col_two:"col_two___3rLB7",icon:"icon___xPPhK",cardText:"cardText___1diVH"}}}]);