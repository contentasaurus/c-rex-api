var express = require('express');
var router = express.Router();
var db = require('../models/knex');

/* GET home page. */
router
	.get('/', (req, res, next) =>
		db('page_layouts').then( function(page_layouts){
			res.send(page_layouts)
		})
	)
	.post('/', (req, res, next) =>
		db('page_layouts')
		.insert(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Layout inserted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Layout not inserted: ' + err
			})
		})
	)
	.get('/:id', (req, res, next) =>
		db('page_layouts').where('id', req.params.id)
		.first()
		.then( function(page_layouts){
			res.send(page_layouts)
		})
	)
	.put('/:id', (req, res, next) =>
		db('page_layouts').where('id', req.params.id)
		.update(req.body)
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Layout updated'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Layout not updated: ' + err
			})
		})
	)
	.delete('/:id', (req, res, next) =>
		db('page_layouts').where('id', req.params.id).del()
		.then( function(rows){
			res.status(200).send({
				status: 'success',
				message: 'Layout deleted'
			})
		}, next).catch(function(err){
			res.status(404).send({
				status: 'failure',
				message: 'Layout not deleted: ' + err
			})
		})
	);

module.exports = router;
