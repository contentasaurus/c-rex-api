var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('components').then( function(components){
			res.send(components)
		})
	)
	.post('/', (req, res, next) =>
		db('components')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Component inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Component not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('components').where('id', req.params.id)
		.first()
		.then( function(components){
			res.send(components)
		})
	)
	.put('/:id', (req, res, next) =>
		db('components').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Component updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Component not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('components').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Component deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Component not deleted: ' + err
			})
		})
	);

module.exports = router;
