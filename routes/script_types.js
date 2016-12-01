var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('script_types').then( function(script_types){
			res.send(script_types)
		})
	)
	.post('/', (req, res, next) =>
		db('script_types')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Script type inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Script type not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('script_types').where('id', req.params.id)
		.first()
		.then( function(script_types){
			res.send(script_types)
		})
	)
	.put('/:id', (req, res, next) =>
		db('script_types').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Script type updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Script type not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('script_types').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Script type deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Script type not deleted: ' + err
			})
		})
	);

module.exports = router;
