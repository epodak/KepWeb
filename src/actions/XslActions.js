import alt from '../alt/alt';
 
class XslActions {
  fetchXsl(xsl, xml) {
    return {xsl,xml};
  }
 
}
 
export default alt.createActions(XslActions);