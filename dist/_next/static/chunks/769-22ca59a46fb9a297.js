(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[769],{5334:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return w}});var d=c(7568),e=c(1438),f=c(8029),g=c(258),h=c(4051),i=c.n(h),j=c(5893),k=c(7294),l=c(214),m=c.n(l),n=c(3651),o=c(4146),p=c(6731),q=JSON.parse('{"Mt":[{"inputs":[{"internalType":"uint256[2]","name":"a","type":"uint256[2]"},{"internalType":"uint256[2][2]","name":"b","type":"uint256[2][2]"},{"internalType":"uint256[2]","name":"c","type":"uint256[2]"},{"internalType":"uint256[12]","name":"input","type":"uint256[12]"}],"name":"verifyProof","outputs":[{"internalType":"bool","name":"r","type":"bool"}],"stateMutability":"view","type":"function"}]}'),r=c(2325).tt;function s(a){return t.apply(this,arguments)}function t(){return(t=(0,d.Z)(i().mark(function a(b){var c,d,e;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!b){a.next=7;break}return a.next=3,b.credentialsSchema();case 3:return e=(d=JSON.parse(c=a.sent)).schema_json.claims,a.abrupt("return",e);case 7:case"end":return a.stop()}},a)}))).apply(this,arguments)}function u(a,b,c){return v.apply(this,arguments)}function v(){return(v=(0,d.Z)(i().mark(function a(b,c,d){var e,f,g,h,j,k,l,m,p,s;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.exportSolidityCallData(b.proof,b.publicSignals);case 2:if(g=[(f=(e=a.sent).replace(/[[\]"\s]/g,"").split(","))[0],f[1]],h=[[f[2],f[3]],[f[4],f[5]]],j=[f[6],f[7]],k=f.slice(8),!c){a.next=17;break}return m=c.verifier(),p=new n.vU(q.Mt),l=new o.CH(m,p,d),a.next=15,l.verifyProof(g,h,j,k);case 15:return s=a.sent,a.abrupt("return",{result:s,Input:k});case 17:case"end":return a.stop()}},a)}))).apply(this,arguments)}var w=function(a){(0,f.Z)(c,a);var b=(0,g.Z)(c);function c(){return(0,e.Z)(this,c),b.apply(this,arguments)}return c.prototype.render=function(){var a=this,b=this;return(0,j.jsxs)("div",{className:m().issuerContainer,children:[(0,j.jsx)("h1",{children:"User Verify"}),(0,j.jsx)("h3",{children:"Input the proof below"}),(0,j.jsx)("textarea",{rows:15,cols:70,onChange:function(b){a.setState(function(a){return{proofPack:JSON.parse(b.target.value)}})}}),(0,j.jsx)("button",{className:m().verifyButton,onClick:(0,d.Z)(i().mark(function a(){var c,d,e,f,g,h,j,k,l,m,n,o,q;return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,u(b.state.proofPack,b.props.credentialsDB,b.props.signer);case 2:return c=a.sent,a.next=5,s(b.props.credentialsDB);case 5:for(o=0,e=(d=a.sent).indexOf("ethAddress"),f=[];o<d.length;o++)if(g=(g=null==c?void 0:c.Input[o].slice(2)).replace(/^0+/,""),o!==e){for(j=0,h="";j<g.length;j+=2)h+=String.fromCharCode(parseInt(g.substr(j,2),16));f.push(h)}else f.push("0x"+g);if(k=p.O$.from(null==c?void 0:c.Input[d.length]),!b.props.credentialsDB){a.next=15;break}return a.next=14,b.props.credentialsDB.getMerkleRoot();case 14:l=a.sent;case 15:for(m="0x"+(m=(m=null==c?void 0:c.Input[d.length+1].slice(2)).replace(/^0+/,"")),n=[],o=(null==c?void 0:c.Input.length)-d.length;o<(null==c?void 0:c.Input.length);o++)"0x0000000000000000000000000000000000000000000000000000000000000001"===(q=null==c?void 0:c.Input[o])?n.push(1):n.push(0),q=null==c?void 0:c.Input[o].slice(2);console.log(n),c&& !0===c.result&&b.setState(function(a){return{proofSuccess:!0,claimsArray:d,credentialVals:f,contractRoot:null==c?void 0:c.Input[d.length],credentialSubjectAddress:m,disclosureVector:n}});case 22:case"end":return a.stop()}},a)})),children:"Verify Proof"}),this.state&&this.state.proofSuccess&&this.state.claimsArray?(0,j.jsxs)("div",{children:[(0,j.jsx)("h3",{children:"Proof verification OK!"}),(0,j.jsx)("h3",{children:"Contract Merkle root:"}),(0,j.jsx)("h4",{children:this.state.contractRoot}),(0,j.jsx)("h3",{children:"Credential walletAddress:"}),(0,j.jsx)("h4",{children:this.state.credentialSubjectAddress}),(0,j.jsx)("h3",{children:"Credential claims:"}),(0,j.jsx)("ul",{children:this.state.claimsArray.map(function(b,c){return(0,j.jsxs)("li",{children:[b," = ",a.state.disclosureVector[c]?a.state.credentialVals[c]:'"Hidden"']},b)})})]}):(0,j.jsx)("div",{})]})},c}(k.Component)},214:function(a){a.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",footer:"Home_footer____T7K",header:"Home_header__GCVRv",title:"Home_title__T09hD",conButton:"Home_conButton__cn8D3",conButtonAddress:"Home_conButtonAddress__gF3ft",issuerContainer:"Home_issuerContainer__eMDro",issuerForm:"Home_issuerForm__kJ0v2",formLabel:"Home_formLabel__U6w15",issuerFormContainer:"Home_issuerFormContainer__5rpbZ",modalBackground:"Home_modalBackground__Rn404",modalContainer:"Home_modalContainer__RUPnO",issueStep:"Home_issueStep__FMisM",loadingSpinner:"Home_loadingSpinner__G8du1",spinner:"Home_spinner__DDWoZ",check:"Home_check__G1jDm",userSelection:"Home_userSelection__YDsZD",credNumberIn:"Home_credNumberIn__hvoCh",verifyButton:"Home_verifyButton__G3Lww"}},8677:function(){},2808:function(){},299:function(){},5979:function(){},7503:function(){}}])