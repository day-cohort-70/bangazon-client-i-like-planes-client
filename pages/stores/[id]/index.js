import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Navbar from '../../../components/navbar'
import { ProductCard } from '../../../components/product/card'
import Detail from '../../../components/store/detail'
import { useAppContext } from '../../../context/state'
import { deleteProduct, getProducts } from '../../../data/products'
import { favoriteStore, getStoreById, unfavoriteStore } from '../../../data/stores'

export default function StoreDetail() {
  const { profile } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const [store, setStore] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const [soldProducts, setSoldProducts] = useState([])

  useEffect(() => {
    if (id) {
      refresh()
    }
    if (parseInt(id) === profile.store?.id) {
      setIsOwner(true)
    }
  }, [id, profile])

  const refresh = () => getStoreById(id).then(storeData => {
    if (storeData) {
      setStore(storeData)
    }
    getProducts(`number_sold=1&store=${id}`).then(prodData =>{
      if (prodData){
        setSoldProducts(prodData)
      }
    })
  })

  const removeProduct = (productId) => {
    deleteProduct(productId).then(refresh)
  }

  const favorite = () => {
    favoriteStore(id).then(refresh)
  }

  const unfavorite = () => {
    unfavoriteStore(id).then(refresh)
  }

  return (
    <>
      <Detail store={store} isOwner={isOwner} favorite={favorite} unfavorite={unfavorite} />
      <h1 className='title'> Selling: </h1>
      <div className="columns is-multiline">
        {
          store.products?.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              isOwner={isOwner}
              removeProduct={removeProduct}
            />
          ))
        }
        {
          store.products?.length === 0 ?
            <p>There's no products yet</p>
            :
            <></>
        }
      </div>
      {isOwner ?
      <>
      <h1 className='title'> Sold: </h1>
      <div className="columns is-multiline">
        {
          soldProducts?.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              // isOwner={isOwner}
              // removeProduct={removeProduct}
            />
          ))
        }
        {
          soldProducts?.length === 0 ?
            <p>There's no products sold yet</p>
            :
            <></>
        }
      </div>
      </>: <></>}
    </>
  )
}

StoreDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
