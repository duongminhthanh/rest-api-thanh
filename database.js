const Pool = require('pg').Pool
const pool = new Pool({
  user: 'zyibvitmekmeew',
  host: 'ec2-52-71-55-81.compute-1.amazonaws.com',
  database: 'deb62f4o6l8i6g',
  password: 'd00f578e52a90d1c453a00a8700d62406fed18beefc5ff6ec6b93259064461ff',
  port: 5432,
  ssl:true
})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

const getCats = (request, response) => {
    pool.query('SELECT * FROM cat_categories ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const getCatById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM cat_categories WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createCat = (request, response) => {
    const { cat_name, price } = request.body
  
    pool.query('INSERT INTO cat_categories (name, price) VALUES ($1, $2)', [cat_name, price], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Cat added with ID: ${result.insertId}`)
    })
}
const updateCat = (request, response) => {
    const id = parseInt(request.params.id)
    const { cat_name, price } = request.body
  
    pool.query(
      'UPDATE cat_categories SET cat_name = $1, price = $2 WHERE id = $3',
      [cat_name, price, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`cat modified with ID: ${id}`)
      }
    )
  }
  
  const deleteCat = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM cat_categories WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Cat deleted with ID: ${id}`)
    })
  }

module.exports = {
    getCats,
    getCatById,
    createCat,
    updateCat,
    deleteCat,
  }