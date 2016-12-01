var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('datatypes').then( function(datatypes){
			res.send(datatypes)
		})
	)
	.post('/', (req, res, next) =>
		db('datatypes')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Datatype inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Datatype not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('datatypes').where('id', req.params.id)
		.first()
		.then( function(datatypes){
			res.send(datatypes)
		})
	)
	.put('/:id', (req, res, next) =>
		db('datatypes').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Datatype updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Datatype not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('datatypes').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Datatype deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Datatype not deleted: ' + err
			})
		})
	);

module.exports = router;
