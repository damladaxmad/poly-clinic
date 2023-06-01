import axios from "axios"
import { constants } from "../Helpers/constantsFile"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { setPurchases2 } from "../redux/actions/purchases2Actions";
import useFetch from "../funcrions/DataFetchers";
import moment from "moment";


const ImportProducts = () => {

  let data = [
  ]

  const myFunction = (item) => {
     let name = item.name
     let balance = item.balance
     let payTransactions = []
     item?.transactions?.map(t => {
      if (t.description == "Payment") payTransactions.push(t.date)
     })

    //  console.log(payTransactions)
    if (payTransactions.length > 0)
     var max = payTransactions?.reduce(function (a, b) { return a > b ? a : b; });
     const date1 = new Date(max);
     const date2 = new Date('05/31/2023');
     const diffTime = Math.abs(date2 - date1);
     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

     if (diffDays)
     data.push({name: name, balance: balance, last: diffDays})

  }

  console.log(data)
   
  const products = useSelector((state) => state.products.products);
  const sales = useSelector((state) => state.sales.sales);

  let totalPrice = 0
  sales?.map(data => {
   totalPrice += data.total
  })

  let cost = 0
  let product = []
  sales?.map(data => {
    product.push(data.products)
  })

  let totalItems = 0
  let names = []
   product?.flat()?.map(data => {
    totalItems += 1
    names.push(data.item)
   })


  // Products-ka ugu qaalisan?
  // let topValues = products?.sort((a,b) => b.unitPrice-a.unitPrice).slice(0,10);
  // let bottomValues = products?.sort((a,b) => (a.unitPrice * a.packSize)-(b.unitPrice * b.packSize)).slice(0,10);
  // let mostProfit = products?.sort((a,b) => (b.salePrice * b.packSize - b.unitPrice * b.packSize)-(a.salePrice * a.packSize - a.unitPrice * a.packSize)).slice(0,50);
  // console.log(products)
  const [view, setView] = useState(1)
  const dispatch = useDispatch()
  const purchases = useSelector((state) => state.purchases2.purchases2);
  dispatch(
    setPurchases2(
      useFetch(
        `sales/summery/05-01-2023/05-31-2023`,
        view,
        `sales`
      )
    )
  );
  let transactions = useFetch("customers/customers-with-transactions", view, "customers")
  console.log(transactions)
  let mayDeen = 0
  let tr = []
  transactions?.map(t => {
    tr.push(t.transactions)
  })

  tr.flat()?.map(t => {
    if (new Date(t.date) >= new Date('05/01/2023')) {
      mayDeen += t.credit
      if (t.credit > 0)
      console.log(t)
    }
  })

  console.log(mayDeen)

  
  let topValues = purchases?.sort((a,b) => b.totalPrice-a.totalPrice).slice(0,20);
  // let waqtiDheer = data?.sort((a,b)=> Date.parse(a)-Date.parse(b));
  let mostValues = purchases?.sort((a,b) => b.totalQuantity-a.totalQuantity).slice(0,10);
  let mostActive = transactions?.sort((a,b) => b.transactions.length-a.transactions.length).slice(0,10);
  
  // Dadka la maqan deenta waqtiga ugu badan
  
  transactions?.forEach(myFunction)
  let waqtiDheer = data?.sort((a,b) => parseInt(b.last) - parseInt(a.last)).slice(0,10);

  let myIndex = 0

  return (
    <div  style={{
      height: "100%",
      width: "95%",
      margin: "0px auto",
      display: "flex",
      gap: "32px",
      flexDirection: "column",
    }}>

     <Typography style = {{
      fontSize: "20px", fontWeight: "bold", margin: "0px"
     }}> 1. Income made from sales.</Typography>

       <p style = {{margin: "0px"}}> {totalPrice.toFixed(2)}</p>

     <Typography style = {{
      fontSize: "20px", fontWeight: "bold", margin: "0px"
     }}> 2. Number of times products sold.	</Typography>

      <p> {totalItems}</p>

     <Typography style = {{
      fontSize: "20px", fontWeight: "bold", margin: "0px"
     }}> 3. Top products with most profit.	</Typography>

     <div>
      {topValues?.map((value, index) => {
        return (<div style = {{display: "flex",
        width: "40%", justifyContent: "space-between"}}>
          <p> {index + 1}. ___{value.name}</p>
          <p> {value.totalQuantity}</p>
          <p> ${value.totalPrice}</p>
        </div>)
      })}
      </div>


     <Typography style = {{
      fontSize: "20px", fontWeight: "bold", margin: "0px"
     }}> 4. Dadka ugu dhaq-dhaqaaqa badan. 	</Typography>

     <div>
      {mostActive?.map((value, index) => {
        return (<div style = {{display: "flex",
        width: "40%", justifyContent: "space-between"}}>
          <p> {index + 1}. ___{value.name}</p>
          <p> ${value.balance}</p>
        </div>)
      })}
      </div>

     <Typography style = {{
      fontSize: "20px", fontWeight: "bold", margin: "0px"
     }}> 5. Dadka la maqan deenta waqti dheer. 	</Typography>

     <div>
      {data?.sort().map((value, index) => {
        if (index > 29) return
        if (value.balance < 1) return 
        myIndex += 1
        return (<div style = {{display: "flex",
        width: "40%", justifyContent: "space-between"}}>
          <p> {myIndex}. ___{value.name}</p>
          <p> {value.last ? `${value.last} days`: "No Payment"}</p>
          <p> ${value.balance}</p>
        </div>)
        
      })}
      </div>

           <Typography style = {{
      fontSize: "20px", fontWeight: "bold", margin: "0px"
     }}> 6. Bishaan inta deen lagaa qaatay. 	</Typography>

           <p style = {{margin: "0px"}}> {mayDeen.toFixed(2)}</p>     


    </div>
  )
}

export default ImportProducts

{/* <Typography style = {{
  fontSize: "20px", fontWeight: "bold"
 }}> Liiska products ka ugu raqiisan ?</Typography>
 
 <div>
  {bottomValues?.map((value, index) => {
    return (<div style = {{display: "flex",
    width: "40%", justifyContent: "space-between"}}>
      <p> {index + 1}. ___{value.name}</p>
      {/* <p style = {{width: "35%",}}> ${value.category}</p> */}
  //     <p> ${value.unitPrice}</p>
  //   </div>)
  // })}
  // </div>

//   <Typography style = {{
//   fontSize: "20px", fontWeight: "bold"
//  }}> Liiska products-ka ugu faa'iidada badan ?</Typography>

// <div>
//   {mostProfit?.map((value, index) => {
//     return (<div style = {{display: "flex",
//     width: "40%", justifyContent: "space-between"}}>
//       <p> {index + 1}. ___{value.name}</p>
//       <p> ${value.unitPrice}</p>
//       <p> ${value.salePrice}</p> 
//     </div>)
//   })}
//   </div> */}
