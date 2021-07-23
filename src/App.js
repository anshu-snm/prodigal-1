import React,{useState,useEffect} from 'react'
import {Multiselect} from 'multiselect-react-dropdown';

import axios from 'axios'
import 'rsuite/dist/styles/rsuite-default.css';
import { RangeSlider} from 'rsuite';
import Table from './Table';


function App() {
  const [options,setOptions] = useState([])
  const [finalSelected,setSelected] = useState([])
  const [filteredData,setfilteredData] = useState([]);
  const[rangeMax,setRangemax] = useState()
  const[rangeMin,setRangemin] = useState()
  const[rangeValue,setRangevalue] = useState()
  const newArray = []

  

  const onFinal = (e)=>{
    e.preventDefault()
   
    axios.post('https://damp-garden-93707.herokuapp.com/getfilteredcalls',  {"info":{"filter_agent_list":finalSelected,"filter_time_range":rangeValue}
  }).then(({data}) => {
    console.log(data.data)
    setfilteredData(data.data)});
  }

  const handleChange = (value)=>{
    setRangevalue(value)
    console.log(value)
  }

  const onSelect = (item) =>{
   const selectedItems = []
      //selectedItems.push()
      item.forEach((object)=>{
        
          selectedItems.push(object.name)
          setSelected(selectedItems)
          console.log(selectedItems)
      })
      
  }
  const onRemove = (item) =>{
    const selectedItems = []
      //selectedItems.push()
      item.forEach((object)=>{
        
          selectedItems.push(object.name)
          setSelected(selectedItems)
          console.log(selectedItems)
      })
  }
useEffect(()=>{
axios.get('https://damp-garden-93707.herokuapp.com/getlistofagents')
  .then(function ({data}) {
    // handle success
  

    const a1 = data.data.listofagents;
    a1.forEach((item)=>{
      newArray.push({name:item})
    })

    
    setOptions(newArray)

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  axios.get('https://damp-garden-93707.herokuapp.com/getdurationrange')
  .then(function ({data}) {
    // handle success
  

    setRangemax(data.data.maximum)
    setRangemin(data.data.minimum)


    
    

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

},[])
  
  return (
    <div>
    

<Multiselect
options={options} // Options to display in the dropdown
// selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
 onSelect={onSelect} // Function will trigger on select event
 onRemove={onRemove} // Function will trigger on remove event

 displayValue= "name" // Property name to display in the dropdown options
/>
<br/>
<br/>
<br/>
<div style={{
      display: 'block', width: 600, paddingLeft: 30
    }}>

<RangeSlider
        max={rangeMax}
        min={rangeMin}
        step = {1}
       
       
        value = {rangeValue}
        onChange= {handleChange}
      />
      <br/>
      <br/>

<button  type = "submit" onClick = {onFinal}>Submit </button>

<Table filteredData = {filteredData}/>
     </div>
    </div>
  )
}

export default App

