var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('scripts').then( function(scripts){
			res.send(scripts)
		})
	)
	.post('/', (req, res, next) =>
		db('scripts')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'script inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'script not inserted: ' + err
			})
		})
	)
	.get('/:id(\\d+)', (req, res, next) =>
		db('scripts').where('id', req.params.id)
		.first()
		.then( function(scripts){
			res.send(scripts)
		})
	)
	.get('/for-listing', (req, res, next) =>
		db.select(
			'scripts.id',
			'scripts.name',
			'script_types.name AS type',
			'users.first_name AS author_first_name',
			'users.last_name AS author_last_name',
			'scripts.created_at',
			'scripts.updated_at',
			'scripts.priority'
		).from('scripts')
		.leftJoin('script_types', 'script_types.id', 'scripts.script_type_id' )
		.leftJoin('users', 'users.id', 'scripts.author_user_id' )
		.orderBy('scripts.priority', 'desc')
		.then( function(scripts){
			res.send(scripts)
		})
	)
	.get('/for-layout/:id', (req, res, next) =>
		db('script_types').select('id','name')
		.map( function(type){
			return db.select(
				'scripts.id',
				'script_types.name AS type_name',
				'scripts.name',
				'scripts.html'
			)
			.select(
				db.raw('ifnull(page_layout_scripts.load_order, "null") AS load_order')
			)
			.from('scripts')
				.join('script_types', 'scripts.script_type_id', 'script_types.id')
				.leftJoin('page_layout_scripts', 'page_layout_scripts.script_id', 'scripts.id')
			.where('script_types.id', type.id)
			.andWhere('page_layout_scripts.page_layout_id', req.params.id)
			.orderBy('load_order', 'asc')
			.then( function(scripts){
				type.scripts = scripts;
				return type;
			})
		})
		.then(function(x){
			res.send(x)
		})
	)
	.put('/:id(\\d+)', (req, res, next) =>
		db('scripts').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'script updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'script not updated: ' + err
			})
		})
	)
	.delete('/:id(\\d+)', (req, res, next) =>
		db('scripts').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'script deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'script not deleted: ' + err
			})
		})
	);

module.exports = router;
