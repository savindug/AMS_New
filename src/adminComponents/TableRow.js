import React, {Component} from 'react';


/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
class TableRow extends Component {
    render() {
        return (
           <tr>
               <td>
                   {this.props.obj.pname}
               </td>
               <td>
                   {this.props.obj.bname}
               </td>
               <td>
                   {this.props.obj.nic}
               </td>
           </tr>
        );
    }
}

export default TableRow;