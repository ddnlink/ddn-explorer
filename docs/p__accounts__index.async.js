(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"+e0h":function(e,t,a){e.exports={pageWrap:"pageWrap___1Jr77"}},"2R4q":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,c,s=a("bx4M"),o=(a("g9YV"),a("wCAj")),i=a("d6i3"),l=a.n(i),u=(a("miYZ"),a("tsqr")),d=a("p0pE"),p=a.n(d),g=a("1l/V"),b=a.n(g),h=a("q1tI"),m=a.n(h),w=(a("bZMm"),a("LLXN")),f=a("6YkS"),v=a("20nU"),x=a("MuoO"),k=a("+e0h"),M=a.n(k),E=e=>[{title:Object(w["formatMessage"])({id:"account.address"}),dataIndex:"address",sorter:!1,width:"30%",render:t=>{return console.log("/////////////",e),m.a.createElement(f["Link"],{to:"/accounts/"+t,target:"_blank"},t)}},{title:Object(w["formatMessage"])({id:"account.balance"})+"(".concat(v["a"].coinName,")"),dataIndex:"balance",sorter:!1,width:"20%",render:(e,t,a)=>{return t.balance>1e8?Number(t.balance/1e8):Number(t.balance)+"d"}},{title:Object(w["formatMessage"])({id:"account.publicKey"}),dataIndex:"publicKey",width:"30%",render:e=>{return m.a.createElement("div",null,e&&e.slice(0,20)+"...")}},{title:Object(w["formatMessage"])({id:"account.percent"}),dataIndex:"pecent",width:"20%",render:(t,a,n)=>{if(a.balance>1e8){var r=a.balance,c=e.props.global.status.supply;return console.log("total",c,r),Number(r/c*100).toFixed(4)+"%"}return Number(a.balance)+"d"}}],I=(n=Object(x["connect"])(e=>{var t=e.accounts,a=e.global;return{accounts:t,global:a}}),n((c=class extends h["Component"]{constructor(){var e;super(...arguments),e=this,this.state={loading:!1,filterDropdownVisible:!1,searchText:""},this.onInputChange=(e=>{this.setState({searchText:e.target.value})}),this.handleTableChange=((e,t,a)=>{this.getBlocks({current:e.current,limit:e.pageSize,offset:(e.current-1)*e.pageSize})}),this.getBlocks=b()(l.a.mark(function t(){var a,n=arguments;return l.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:a=n.length>0&&void 0!==n[0]?n[0]:{},e.setState({loading:!0}),e.props.dispatch({type:"accounts/getAccountList",payload:p()({},a),callback:t=>{!0!==t.success&&u["a"].error(t.error),e.setState({loading:!1})}});case 3:case"end":return t.stop()}},t)}))}componentDidMount(){this.getBlocks({offset:1,limit:20})}render(){var e=this.props.accounts;console.log(e);var t=e.accountList.account.accounts,a=e.accountList.pagination;return m.a.createElement("div",{className:M.a.pageWrap},m.a.createElement(s["a"],null,m.a.createElement(o["a"],{columns:E(this),rowKey:e=>e.address,dataSource:t,pagination:a,loading:this.state.loading,onChange:this.handleTableChange})))}},r=c))||r);t["default"]=I}}]);