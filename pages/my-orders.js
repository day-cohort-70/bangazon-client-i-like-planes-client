import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Table from '../components/table'
import { getOrders } from '../data/orders'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const headers = ['Order Date', 'Total', 'Payment Method']

  useEffect(() => {
    getOrders().then(ordersData => {
      if (ordersData) {
        setOrders(ordersData)
      }
    })
  }, [])

  return (
    <>
      <CardLayout title="Your Orders">
        <Table headers={headers}>
          {
            orders
              .filter(order => order.payment_type)
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.created_date}</td>
                  <td>${order.total_price}</td>
                  <td>{order.payment_type?.merchant_name}</td>
                </tr>
              ))
          }
        </Table>
        <></>
      </CardLayout>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}