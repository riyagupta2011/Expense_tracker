import React, { useState } from 'react'
import styled from 'styled-components'


const Container=styled.div`
display: flex;
flex-direction: column;
margin: 10px;
align-items: center;
font-size: 16px;
width: 100%;

`;
const BalanceBox=styled.div`
font-size: 18px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
font-weight: bold;
`;

const AddTransaction=styled.div`
font-size: 15px;
background: #0d1d2c;
display: flex;
color: white;
padding: 5px 10px;

cursor: pointer;
flex-direction: row;
border-radius: 4px;
font-weight: bold;


`;

const AddTransactionContainer=styled.div`
 display:flex;
 flex-direction:column;
 border:1px solid #e6e8e9;
 gap:10px;
 width:100%;
 padding:15px 20px;
margin:20px;
& input {
  outline:none;
  padding:10px 12px;
  border-radius:4px;
  border:1px solid #e6e8e9;
}
`;
const RadioBox=styled.div`
display:flex;
flex-direction:row;
width:100%;
align-items:center;

& input
{
  width:unset;
  margin:0 10px;
}
`
const ExpenseContainer =styled.div`
display:flex;
flex-direction:row;
gap:12px;
margin:20px;
`
const ExpenseBox=styled.div`
display:flex;
flex-direction:column;
border-radius:4px;
border:1px solid #e6e8e9;
padding:15px 20px;
width:135px;
font-size:14px;
& span{
  font-weight:bold;
  font-size:20px;
  color:${props=>props.isIncome?'green' : 'red'}
}
`
const AddTransactionView=(props)=>{
  const [amount,setAmount]=useState();
  const [desc,setDesc]=useState();
  const [type,setType]=useState("Expense")

  const addTransaction=()=>{
    props.addTransaction({amount,desc,type,id:Date.now()})
   
    props.toggleAddTxn()
  }

return(
  <AddTransactionContainer>
   <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
   <input type="text" placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} />
   <RadioBox>
      <input type="radio"  id="expense" name="type" value="Expense" checked={type==="Expense"} onChange={(e)=>setType(e.target.value)}/>
      <label htmlFor="expense">Expense</label>
      <input type="radio"  id="income" name="type" value="Income" checked={type==="Income"} onChange={(e)=>setType(e.target.value)}/>
      <label htmlFor="income">Income</label>
      
   </RadioBox>
   <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
  </AddTransactionContainer>
)
}
const Overview = (props) => {
  const [isAddTxnVisible,toggleAddTxn]=useState(false)
  return (
   <Container>
    <BalanceBox>
        Balance: ${props.income-props.expense}
        <AddTransaction onClick={()=>toggleAddTxn(!isAddTxnVisible)}>{isAddTxnVisible?"Cancel":"ADD"}</AddTransaction>
    </BalanceBox>
    {isAddTxnVisible && <AddTransactionView toggleAddTxn={toggleAddTxn} addTransaction={props.addTransaction}/>}
    <ExpenseContainer>
       <ExpenseBox isIncome={false}>
        Expense<span>${props.expense}</span>
       </ExpenseBox>
       <ExpenseBox isIncome={true}>
        Income<span>${props.income}</span>
       </ExpenseBox>
    </ExpenseContainer>
   </Container>
  )
}

export default Overview