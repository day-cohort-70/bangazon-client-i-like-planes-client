import { useEffect, useState } from 'react'
import Filter from '../../components/filter'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getCategoriesWithTopFiveProducts, getProducts } from '../../data/products'

export default function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])
  const [categoriesWithLastFive, setCategoriesWithLastFive] = useState([])

  useEffect(() => {
    getCategoriesWithTopFiveProducts().then(
      (res) => setCategoriesWithLastFive(res)).catch(
        err => { setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`) })
  }, [])

  useEffect(() => {
    getProducts().then(data => {
      if (data) {

        const locationData = [...new Set(data.map(product => product.location))]
        const locationObjects = locationData.map(location => ({
          id: location,
          name: location
        }))

        setProducts(data)
        setIsLoading(false)
        setLocations(locationObjects)
      }
    })
      .catch(err => {
        setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
      })
  }, [])

  const searchProducts = (event) => {
    getProducts(event).then(productsData => {
      if (productsData) {
        setProducts(productsData)
      }
    })
  }

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <Filter productCount={products.length} onSearch={searchProducts} locations={locations} />
      <div>
        {categoriesWithLastFive.map(category => {
          if (category.recent_products.length > 0) {
            return (
              <div key={category.id}>
                <h2 className="title is-4 has-text-centered">{category.name}</h2>
                <div className="columns is-multiline">
                  {category.recent_products.map(product => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </div>
            )
          }
        })}
      </div>
      <div className="columns is-multiline">
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
