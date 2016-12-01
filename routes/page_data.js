var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('page_data').then( function(page_data){
			res.send(page_data)
		})
	)
	.post('/', (req, res, next) =>
		db('page_data')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Page Data inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Page Data not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('page_data').where('id', req.params.id)
		.first()
		.then( function(page_data){
			res.send(page_data)
		})
	)
	.get('/for-page/:id/', (req, res, next) =>
		db.select(
			'page_data.id',
			'page_data.page_id',
			'page_data.reference_name',
			'users.first_name',
			'users.last_name',
			'datatypes.name as datatype_name',
			'pd.updated_at'
		).from('page_data')
		.leftJoin('users','users.id','page_data.author_user_id')
		.leftJoin('datatypes','datatypes.id','page_data.datatype_id')
		.where('page_data', req.params.id)
		.orderBy('page_data.created_at', 'desc')
		.then( function(page_data){
			res.send(page_data)
		})
	)
	.put('/:id', (req, res, next) =>
		db('page_data').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Page Data updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Page Data not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('page_data').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Page Data deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Page Data not deleted: ' + err
			})
		})
	);

module.exports = router;
