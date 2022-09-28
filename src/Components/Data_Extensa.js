import React, { PureComponent } from 'react'
let Data = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default class Data_Extensa extends PureComponent {

render() {
   
    return (
        <div>
            <h3 id='data_Extenso'>Hoje é {Data.toLocaleDateString('pt-PT',options)}</h3>
        </div>
    )
}
}
