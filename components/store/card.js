import Link from 'next/link'
import { ProductCard } from '../product/card.js'

export function StoreCard({ store, width= "is-half" }) {
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {store.name}
          </p>
        </header>
        <div className="card-content">
          <p className="content">
            Owner: {store.seller?.user?.first_name} {store.seller?.user?.last_name}
          </p>
          <div className="content">
            {store.description}
          </div>
          <div className="content">
            Product Count: {store.product_count}
          </div>
          <div className="columns is-multiline">
        {store.products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
        </div>
        <footer className="card-footer">
          <Link href={`stores/${store.id}`}>
            <a className="card-footer-item">View Store</a>
          </Link>
        </footer>
      </div>
    </div>
  )
}
